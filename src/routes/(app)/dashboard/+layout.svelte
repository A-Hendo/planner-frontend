<script lang="ts">
    import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell>
    <svelte:fragment slot="sidebarLeft"></svelte:fragment>
    <svelte:fragment slot="sidebarRight"></svelte:fragment>
    <svelte:fragment slot="pageHeader"></svelte:fragment>
    <slot />
    <svelte:fragment slot="pageFooter"></svelte:fragment>
    <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>
