<script lang="ts">
    import { user } from "$lib/Stores/User";
    import {
        getDrawerStore,
        getModalStore,
        type DrawerSettings,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";
    import {
        CalendarDays,
        LayoutDashboard,
        Settings,
        SquarePlus,
    } from "lucide-svelte";

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
            class="btn-icon bg-initial hover:variant-soft-primary"
            on:click={() => modalStore.trigger(taskModal)}
            ><SquarePlus /></button
        >
    </div>
    <div class="flex-col">
        <a
            href="/dashboard"
            class="btn-icon bg-initial hover:variant-soft-primary"
            ><LayoutDashboard /></a
        >
    </div>
    <!-- <div class="flex-col">
        <button
            type="button"
            class="btn-icon bg-initial hover:variant-soft-primary"
            on:click={() => drawerStore.open(drawers)}><CalendarDays /></button
        >
    </div> -->
    {#if [2, 3].includes($user.type)}
        <div class="flex-col">
            <button
                type="button"
                class="btn-icon bg-initial hover:variant-soft-primary"
                on:click={() => drawerStore.open(drawers)}><Settings /></button
            >
        </div>
    {/if}
</div>
