<script lang="ts">
    export let index: number;
    export let title: string;

    import {
        getDrawerStore,
        type DrawerSettings,
    } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();
    const drawers: DrawerSettings = {
        id: "studio",
        width: "w-[280px] md:w-[380px]",
        meta: { index: index },
    };
</script>

<button
    on:click={() => drawerStore.open(drawers)}
    class="block card card-hover p-4 text-center font-bold text-lg text-wrap w-full h-full truncate"
>
    {title}
</button>
