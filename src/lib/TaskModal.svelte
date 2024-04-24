<!-- svelte-ignore a11y-label-has-associated-control -->
<script lang="ts">
    import { page } from "$app/stores";
    import {
        Autocomplete,
        InputChip,
        ListBox,
        ListBoxItem,
        getModalStore,
        popup,
        type AutocompleteOption,
        type PopupSettings,
    } from "@skeletonlabs/skeleton";
    import { Bug, FilePlus, SquarePlus } from "lucide-svelte";
    import type { SvelteComponent } from "svelte";
    import LoadingButton from "./Components/LoadingButton.svelte";
    import { GetTasks } from "./Stores/Tasks";
    import { Client } from "./client";

    export let parent: SvelteComponent;

    export let data = {
        title: "",
        description: "",
        group: "",
        type: 1,
        tags: [],
        assigned: [],
        dependents: [],
        estimation: {},
        importance: 2,
        state: 1,
    };
    let isEdit = false;
    let isLoading = false;

    const modalStore = getModalStore();
    if ($modalStore[0]?.meta?.data) {
        data = $modalStore[0].meta.data;
        isEdit = true;
    }

    console.log(data);

    const inputChipUsers: AutocompleteOption<string>[] = [
        {
            label: "Vanilla",
            value: "vanilla",
        },
        {
            label: "Chocolate",
            value: "chocolate",
        },
        {
            label: "Strawberry",
            value: "strawberry",
        },
        {
            label: "Neapolitan",
            value: "neapolitan",
        },
        {
            label: "Pineapple",
            value: "pineapple",
        },
        {
            label: "Peach",
            value: "peach",
        },
    ];
    let inputChipAssignes: string[];
    let inputUser = "";
    function onSelection(event: CustomEvent<AutocompleteOption<string>>): void {
        inputUser = event.detail.label;
    }

    let onSubmit: Promise;

    async function onFormSubmit(): Promise {
        isLoading = true;
        try {
            if (isEdit) {
                const response = await Client.put(`/task/${data.id}`, data);
            } else {
                const response = await Client.post(
                    `/task/board/${$page.params.id}`,
                    data,
                );
            }
            modalStore.close();
        } catch (error) {
        } finally {
            isLoading = false;
            await GetTasks($page.params.id);
        }
    }

    let popupSettings: PopupSettings = {
        event: "focus-click",
        target: "popupAutocomplete",
        placement: "bottom",
    };

    async function DeleteTask() {
        const response = await Client.delete(`/task/${data.id}`);
        if (response.status === 200) {
            await GetTasks($page.params.id);
            modalStore.close();
        }
    }
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
    <header class="text-2xl font-bold text-center">Create task</header>
    <form
        on:submit={() => (onSubmit = onFormSubmit())}
        class="p-4 space-y-4 rounded-container-token"
    >
        <label class="label">
            <span class="font-bold">Title</span>
            <input
                required
                class="input p-1"
                type="text"
                bind:value={data.title}
            />
        </label>
        <label class="label">
            <span class="font-bold">Description</span>
            <textarea
                rows="4"
                class="textarea p-1"
                bind:value={data.description}
            />
        </label>
        <label class="label">
            <span class="font-bold">Group</span>
            <input class="input p-1" type="email" bind:value={data.group} />
        </label>
        <label class="label">
            <span class="font-bold">Tags</span>
            <InputChip
                bind:value={data.tags}
                name="chips"
                placeholder="Enter tags for custom filtering"
            />
        </label>
        <label class="label invisible">
            <span class="font-bold">Estimation</span>
            <input class="input p-1" type="text" bind:value={data.estimation} />
        </label>
        <div class="flex flex-row w-full">
            <div class="grow m-1">
                <label class="label">
                    <span class="font-bold">Type</span>
                    <ListBox>
                        <ListBoxItem
                            bind:group={data.type}
                            name="Task"
                            value={1}
                        >
                            <svelte:fragment slot="lead">
                                <FilePlus class="text-green-500 w-4 h-4 mx-2" />
                            </svelte:fragment>
                            Task</ListBoxItem
                        >
                        <ListBoxItem
                            bind:group={data.type}
                            name="Bug"
                            value={2}
                        >
                            <svelte:fragment slot="lead">
                                <Bug class="text-red-500 w-4 h-4 mx-2" />
                            </svelte:fragment>
                            Bug</ListBoxItem
                        >
                    </ListBox>
                </label>
            </div>
            <div class="grow m-1">
                <label class="label">
                    <span class="font-bold">Importance</span>
                    <ListBox>
                        <ListBoxItem
                            bind:group={data.importance}
                            name="Low"
                            value={1}>Low</ListBoxItem
                        >
                        <ListBoxItem
                            bind:group={data.importance}
                            name="Medium"
                            value={2}>Medium</ListBoxItem
                        >
                        <ListBoxItem
                            bind:group={data.importance}
                            name="High"
                            value={3}>High</ListBoxItem
                        >
                    </ListBox>
                </label>
            </div>
            <div class="grow m-1">
                <label class="label">
                    <span class="font-bold">State</span>
                    <ListBox default={0}>
                        <ListBoxItem
                            bind:group={data.state}
                            name="To do"
                            value={1}>To do</ListBoxItem
                        >
                        <ListBoxItem
                            bind:group={data.state}
                            name="In progress"
                            value={2}>In progress</ListBoxItem
                        >
                        <ListBoxItem
                            bind:group={data.state}
                            name="Verification"
                            value={3}>Verification</ListBoxItem
                        >
                        <ListBoxItem
                            bind:group={data.state}
                            name="Done"
                            value={4}>Done</ListBoxItem
                        >
                    </ListBox>
                </label>
            </div>
            <div>
                <label class="label hidden">
                    <span>Assignees</span>
                    <input
                        class="input autocomplete"
                        type="search"
                        placeholder="Search users"
                        bind:value={inputUser}
                        name="autocomplete-search chips"
                        use:popup={popupSettings}
                    />
                    <div
                        class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
                        tabindex="-1"
                        data-popup="popupAutocomplete"
                    >
                        <Autocomplete
                            bind:input={inputUser}
                            options={inputChipUsers}
                            on:selection={onSelection}
                            denylist={inputChipAssignes}
                        />
                    </div>
                </label>
            </div>
        </div>
        <footer class="modal-footer {parent.regionFooter}">
            {#if isEdit}
                <button
                    class="btn variant-filled-warning order-start"
                    type="button"
                    on:click={DeleteTask}>Delete</button
                >
            {/if}
            <button class="btn variant-ghost" on:click={parent.onClose}
                >{parent.buttonTextCancel}</button
            >
            {#if isEdit}
                <LoadingButton
                    class="btn variant-filled-primary order-last"
                    text="Update"
                    icon={SquarePlus}
                    {isLoading}
                />
            {:else}
                <LoadingButton
                    class="btn variant-filled-primary order-last"
                    text="Create"
                    icon={SquarePlus}
                    {isLoading}
                />
            {/if}
        </footer>
    </form>
</div>
