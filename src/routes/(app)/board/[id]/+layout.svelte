<script lang="ts">
    import BoardNavigation from "$lib/Blocks/BoardNavigation.svelte";
    import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell slotSidebarLeft="board-nav h-content">
    <svelte:fragment slot="header"></svelte:fragment>
    <svelte:fragment slot="sidebarLeft">
        <BoardNavigation />
    </svelte:fragment>
    <svelte:fragment slot="sidebarRight"></svelte:fragment>
    <svelte:fragment slot="pageHeader"></svelte:fragment>
    <slot />
    <svelte:fragment slot="pageFooter"></svelte:fragment>
    <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>
