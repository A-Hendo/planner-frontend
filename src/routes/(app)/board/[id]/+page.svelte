<script lang="ts">
    import TaskFilters from "$lib/Blocks/TaskFilters.svelte";
    import DraggableList from "$lib/DraggableList.svelte";
    import { board } from "$lib/Stores/Boards";
    import { popup, type PopupSettings } from "@skeletonlabs/skeleton";
    import { ListFilter } from "lucide-svelte";
    import type { PageData } from "./$types";

    export const data: PageData = {};

    const filtersPopup: PopupSettings = {
        event: "click",
        target: "filtersPopup",
    };
</script>

<div class="justify-between border-b-1 shadow-sm flex">
    <h3 class="h3 m-4">{$board.name}</h3>
    <button
        class="btn btn-sm variant-filled-primary float-end m-4"
        use:popup={filtersPopup}
        ><ListFilter size="16" class="mr-2" /> Filters</button
    >
</div>

<section class="h-svh overflow-y-hidden">
    <div class="pt-3 relative">
        <div data-popup="filtersPopup">
            <div class="arrow bg-primary-500" />
            <TaskFilters />
        </div>
        <DraggableList />
    </div>
</section>
