<script lang="ts">
    import { page } from "$app/stores";
    import LoadingButton from "$lib/Components/LoadingButton.svelte";
    import { GetTasks } from "$lib/Stores/Tasks";
    import { Client } from "$lib/client";
    import {
        Autocomplete,
        InputChip,
        ListBox,
        ListBoxItem,
        getDrawerStore,
        getModalStore,
        popup,
        type AutocompleteOption,
        type ModalSettings,
        type PopupSettings,
    } from "@skeletonlabs/skeleton";
    import { Bug, FilePlus, SquarePlus } from "lucide-svelte";

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

    let initialData;

    let isLoading = false;

    const drawerStore = getDrawerStore();
    if ($drawerStore?.meta?.data) {
        data = $drawerStore.meta.data;
        initialData = data;
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
            const response = await Client.put(`/task/${data.id}`, data);
            drawerStore.close();
            await GetTasks($page.params.id);
        } catch (error) {
        } finally {
            isLoading = false;
        }
    }

    let popupSettings: PopupSettings = {
        event: "focus-click",
        target: "popupAutocomplete",
        placement: "bottom",
    };
    const modalStore = getModalStore();

    async function DeleteTask() {
        const response = await Client.delete(`/task/${data.id}`);
        if (response.status === 200) {
            modalStore.close();
            drawerStore.close();
        }
        await GetTasks($page.params.id);
    }

    const modal: ModalSettings = {
        type: "confirm",
        title: "Please Confirm",
        body: "This will delete all tasks associated with this board, are you sure you wish to proceed?",
        response: async (r: boolean) => {
            r ? await DeleteTask() : modalStore.close();
        },
    };
</script>

<form
    on:submit={() => (onSubmit = onFormSubmit())}
    on:focusout={async () => await GetTasks($page.params.id)}
    class="p-6 flex flex-col justify-items-center bg-white h-full"
>
    <div class="h-full">
        <div class="my-4">
            <input
                placeholder="Title"
                required
                class="border-0 input h3"
                type="text"
                bind:value={data.title}
            />
        </div>

        <div class="my-4">
            <textarea
                rows="4"
                placeholder="Description"
                class="border-0 textarea resize-none"
                bind:value={$drawerStore.meta.data.description}
            />
        </div>
        <div class="my-4">
            <label class="label flex-col">
                <span class="font-bold">Group</span>
                <input
                    class="input w-4/5"
                    type="text"
                    bind:value={data.group}
                />
            </label>
        </div>
        <div class="my-4">
            <label class="label flex">
                <span class="font-bold content-center">Tags</span>
                <InputChip
                    class="w-4/5 mx-4"
                    bind:value={data.tags}
                    name="chips"
                    placeholder="Enter tags for custom filtering"
                />
            </label>
        </div>
        <label class="label hidden">
            <span class="font-bold">Estimation</span>
            <input class="input" type="text" bind:value={data.estimation} />
        </label>
        <div class="flex flex-row w-full text-sm my-4">
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
    </div>
    <div class="space-y-2 my-4 flex-col">
        <LoadingButton
            class="btn btn-sm variant-filled-primary w-full"
            text="Update"
            icon={SquarePlus}
            {isLoading}
        />
        <button
            class="my-2 btn btn-sm variant-ghost-primary w-full"
            type="button"
            on:click={() => modalStore.trigger(modal)}>Delete</button
        >
    </div>
</form>
