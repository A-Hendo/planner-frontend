<script lang="ts">
    import {
        Autocomplete,
        getModalStore,
        popup,
        type AutocompleteOption,
        type PopupSettings,
    } from "@skeletonlabs/skeleton";
    import { SquarePlus } from "lucide-svelte";
    import type { SvelteComponent } from "svelte";
    import LoadingButton from "./Components/LoadingButton.svelte";
    import { boards } from "./Stores/Boards";
    import { user } from "./Stores/User";
    import { Client } from "./client";
    import type { Board } from "./types";

    export let parent: SvelteComponent;
    const modalStore = getModalStore();
    const data = {
        name: "",
        studioId: "",
    };
    let isLoading = false;

    let studioInput: string;
    const options: AutocompleteOption<string>[] = [];

    $boards.forEach((board: Board) => {
        options.push({ label: board.name, value: board.id });
    });

    function onSelection(event: CustomEvent<AutocompleteOption<string>>): void {
        studioInput = event.detail.label;
        data.studioId = event.detail.value;
    }

    async function onFormSubmit() {
        isLoading = true;
        Client.post("/board", data)
            .then((response) => {
                modalStore.close();
            })
            .catch((error) => console.log(error));
        isLoading = false;
    }
</script>

<div class="card p-4 shadow-xl space-y-4">
    <header class="text-2xl font-bold text-center">Create board</header>
    <form
        on:submit={onFormSubmit}
        class="p-4 space-y-4 rounded-container-token"
    >
        <label class="label">
            <span>Board title</span>
            <input
                required
                class="input p-1"
                type="text"
                bind:value={data.name}
            />
        </label>
        {#if $user.type === 3}
            <label class="label">
                <span class="font-bold">Studio</span>
                <input
                    class="input"
                    type="search"
                    name="search"
                    bind:value={studioInput}
                    placeholder="Search..."
                />
                <div
                    class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto"
                    tabindex="-1"
                >
                    <Autocomplete
                        bind:input={studioInput}
                        {options}
                        on:selection={onSelection}
                    />
                </div>
            </label>
        {/if}
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn btn-sm variant-ghost" on:click={parent.onClose}
                >{parent.buttonTextCancel}</button
            >
            <LoadingButton
                class="btn variant-filled-primary order-last btn-sm"
                text="Create"
                icon={SquarePlus}
                {isLoading}
            />
        </footer>
    </form>
</div>
