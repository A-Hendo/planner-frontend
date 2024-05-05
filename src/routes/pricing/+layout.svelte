<script>
    import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell>
    <svelte:fragment slot="sidebarLeft"></svelte:fragment>
    <svelte:fragment slot="pageHeader"></svelte:fragment>
    <slot />
    <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>
