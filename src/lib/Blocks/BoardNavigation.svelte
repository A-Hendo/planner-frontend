<script lang="ts">
    import {
        getDrawerStore,
        getModalStore,
        type DrawerSettings,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";
    import { CalendarDays, Settings, SquarePlus } from "lucide-svelte";

    const drawerStore = getDrawerStore();
    const drawers: DrawerSettings = {
        id: "settings",
        width: "w-[280px] md:w-[380px]",
    };

    const modalStore = getModalStore();
    const taskModal: ModalSettings = {
        type: "component",
        component: "taskModal",
    };
</script>

<div class="m-2">
    <div class="flex-col">
        <button
            type="button"
            class="btn-icon bg-initial"
            on:click={() => modalStore.trigger(taskModal)}
            ><SquarePlus /></button
        >
    </div>
    <div class="flex-col">
        <button
            type="button"
            class="btn-icon bg-initial"
            on:click={() => drawerStore.open(drawers)}><CalendarDays /></button
        >
    </div>
    <div class="flex-col">
        <button
            type="button"
            class="btn-icon bg-initial"
            on:click={() => drawerStore.open(drawers)}><Settings /></button
        >
    </div>
</div>
