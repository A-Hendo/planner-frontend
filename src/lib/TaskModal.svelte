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

    export let data: {} = {
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

    export let isEdit = false;
    let isLoading = false;

    const modalStore = getModalStore();
    if ($modalStore[0]?.meta?.data) {
        data = $modalStore[0].meta.data;
        isEdit = $modalStore[0].meta.isEdit;
    }

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

    let onSubmit: Promise<void>;

    async function onFormSubmit(): Promise<void> {
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
            modalStore.close();
        }
        await GetTasks($page.params.id);
    }
</script>

<div class="relative card p-4 w-modal shadow-xl space-y-4">
    <header class="text-2xl font-bold text-center">
        {isEdit ? "Edit task" : "Create task"}
    </header>
    <button
        class="btn-icon bg-transparent absolute -top-3 -right-0 z-1 focus:outline-0"
        on:click={parent.onClose}>✕</button
    >
    <form
        on:submit={() => (onSubmit = onFormSubmit())}
        on:cancel={() => modalStore.close()}
        class="p-4 space-y-4 rounded-container-token"
    >
        <label class="label">
            <span class="font-bold">Title</span>
            {#if isEdit}
                <input
                    required
                    class="border-0 input p-1"
                    type="text"
                    bind:value={data.title}
                />
            {:else}
                <input
                    required
                    class="input p-1"
                    type="text"
                    bind:value={data.title}
                />
            {/if}
        </label>
        <label class="label">
            <span class="font-bold">Description</span>
            {#if isEdit}
                <textarea
                    rows="4"
                    class="border-0 textarea p-1 resize-none"
                    bind:value={data.description}
                />
            {:else}
                <textarea
                    rows="4"
                    class="textarea p-1 resize-none"
                    bind:value={data.description}
                />
            {/if}
        </label>
        <label class="label hidden">
            <span class="font-bold">Group</span>
            <input class="input p-1" type="email" bind:value={data.group} />
        </label>
        <label class="label hidden">
            <span class="font-bold">Tags</span>
            <InputChip
                bind:value={data.tags}
                name="chips"
                placeholder="Enter tags for custom filtering"
            />
        </label>
        <label class="label hidden">
            <span class="font-bold">Estimation</span>
            <input class="input p-1" type="text" bind:value={data.estimation} />
        </label>
        <div class="flex flex-row w-full text-sm">
            <div class="grow m-1">
                <label class="label">
                    <span class="font-bold">Type</span>
                    <ListBox default={1} active="variant-glass-primary">
                        <ListBoxItem
                            bind:group={data.type}
                            name="Task"
                            value={1}
                        >
                            <svelte:fragment slot="lead">
                                <FilePlus size="18" class="text-green-600" />
                            </svelte:fragment>
                            Task</ListBoxItem
                        >
                        <ListBoxItem
                            bind:group={data.type}
                            name="Bug"
                            value={2}
                        >
                            <svelte:fragment slot="lead">
                                <Bug size="18" class="text-red-600" />
                            </svelte:fragment>
                            Bug</ListBoxItem
                        >
                    </ListBox>
                </label>
            </div>
            <div class="grow m-1">
                <label class="label">
                    <span class="font-bold">Priority</span>
                    <ListBox default={2} active="variant-glass-primary">
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
                    <ListBox default={1} active="variant-glass-primary">
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
        <footer
            class="flex w-full flex-row {parent.regionFooter} justify-between"
        >
            <div>
                {#if isEdit}
                    <button
                        class="btn btn-sm variant-ringed-warning"
                        type="button"
                        on:click={DeleteTask}>Delete</button
                    >
                {/if}
            </div>
            <div class="">
                <button
                    class="btn btn-sm variant-ghost"
                    type="reset"
                    on:click={() => {
                        modalStore.close();
                    }}>{parent.buttonTextCancel}</button
                >
                {#if isEdit}
                    <LoadingButton
                        class="btn btn-sm variant-filled-primary"
                        text="Update"
                        icon={SquarePlus}
                        {isLoading}
                    />
                {:else}
                    <LoadingButton
                        class="btn btn-sm variant-filled-primary"
                        text="Create"
                        icon={SquarePlus}
                        {isLoading}
                    />
                {/if}
            </div>
        </footer>
    </form>
</div>
