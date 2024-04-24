<script lang="ts">
    import DraggableList from "$lib/DraggableList.svelte";
    import { board } from "$lib/Stores/Boards";
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { SquarePlus } from "lucide-svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const modalStore = getModalStore();

    const taskModal: ModalSettings = {
        type: "component",
        component: "taskModal",
    };
</script>

<div class="w-100 flex flex-col py-3">
    <div class="justify-between">
        <div>
            <h3 class="h3 mx-4">{$board.name}</h3>
        </div>
    </div>
    <DraggableList />
</div>
