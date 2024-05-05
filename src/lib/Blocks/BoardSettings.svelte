<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { board } from "$lib/Stores/Boards";
    import { Client } from "$lib/client";
    import {
        Avatar,
        getModalStore,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";

    let currentBoard = $board;
    const modalStore = getModalStore();

    async function SaveSettings() {
        const response = await Client.put(
            `/board/${$page.params.id}`,
            currentBoard,
        );

        if (response.status === 200) $board = currentBoard;
    }

    async function DeleteBoard() {
        const response = await Client.delete(`/board/${$page.params.id}`);
        if (response.status === 200) {
            await goto("/boards");
        }
        modalStore.close();
    }

    const modal: ModalSettings = {
        type: "confirm",
        title: "Please Confirm",
        body: "This will delete all tasks associated with this board, are you sure you wish to proceed?",
        response: (r: boolean) => {
            r ? DeleteBoard() : modalStore.close();
        },
    };
</script>

<form
    on:submit={SaveSettings}
    class="p-2 flex flex-col justify-items-center bg-white h-full"
>
    <h3 class="h3 text-center">Board Settings</h3>
    <div class="flex flex-col justify-center items-center my-4">
        <Avatar initials={$board.name[0]} width="w-16" rounded="rounded" />
    </div>
    <div class="space-y-2 my-2 h-full">
        <label class="flex items-center space-x-2 m-2">
            <input
                class="checkbox"
                type="checkbox"
                checked={!currentBoard.active}
                on:change={() => (currentBoard.active = !currentBoard.active)}
            />
            <p>Deactivate</p>
        </label>
    </div>
    <div class="my-4 w-full flex-col">
        {#if !$board.active}
            <button
                class="my-2 btn btn-sm w-full variant-ghost-primary"
                on:click={() => modalStore.trigger(modal)}>Delete Board</button
            >
        {/if}
        <button class="my-2 btn btn-sm w-full variant-filled-primary"
            >Save Settings</button
        >
    </div>
</form>
