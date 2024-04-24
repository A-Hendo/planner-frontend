<script lang="ts">
    import AddBoardCard from "$lib/AddBoardCard.svelte";
    import BoardCard from "$lib/BoardCard.svelte";
    import { boards } from "$lib/Stores/Boards";
    import { studios } from "$lib/Stores/Studios";
    import StudioCard from "$lib/StudioCard.svelte";
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { Plus } from "lucide-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    const modalStore = getModalStore();
    const createStudioModal: ModalSettings = {
        type: "component",
        component: "createStudioModal",
    };
</script>

<main class="container mx-auto">
    <div class="py-8">
        <h2 class="font-bold m-3">YOUR STUDIOS</h2>
        <ul class="flex flex-row flex-wrap">
            <li class="p-1 w-40 h-40">
                <button
                    type="button"
                    on:click={() => modalStore.trigger(createStudioModal)}
                    class="card card-hover p-4 w-full h-full flex justify-center content-center"
                >
                    <Plus size="50" class="self-center" />
                </button>
            </li>
            {#if $studios}
                {#each $studios as studio, index}
                    <li class="p-1 w-40 h-40">
                        <StudioCard title={studio.name} {index} />
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
    <div class="py-8">
        <h2 class="font-bold m-3">YOUR BOARDS</h2>
        <ul class="flex flex-row flex-wrap">
            <li class="p-1 w-40 h-40">
                <AddBoardCard />
            </li>
            {#if $boards}
                {#each $boards as board}
                    <li class="p-1 w-40 h-40">
                        <BoardCard title={board.name} id={board.id} />
                    </li>
                {/each}
            {/if}
        </ul>
    </div>
</main>
