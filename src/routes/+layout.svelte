<script lang="ts">
    import BoardSettings from "$lib/Blocks/BoardSettings.svelte";
    import StudioDrawer from "$lib/Blocks/StudioDrawer.svelte";
    import PasswordModal from "$lib/Components/PasswordModal.svelte";
    import TaskDrawer from "$lib/Components/TaskDrawer.svelte";
    import CreateBoardModal from "$lib/CreateBoardModal.svelte";
    import CreateStudioModal from "$lib/CreateStudioModal.svelte";
    import LoginModal from "$lib/LoginModal.svelte";
    import Navigation from "$lib/Navigation.svelte";
    import SignUpModal from "$lib/SignUpModal.svelte";
    import TaskModal from "$lib/TaskModal.svelte";
    import {
        arrow,
        autoUpdate,
        computePosition,
        flip,
        offset,
        shift,
    } from "@floating-ui/dom";
    import {
        AppShell,
        Drawer,
        Modal,
        getDrawerStore,
        initializeStores,
        storePopup,
        type ModalComponent,
    } from "@skeletonlabs/skeleton";
    import "../app.pcss";

    initializeStores();
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    let taskData = {
        title: "",
        description: "",
        group: "",
        type: 1,
        tags: [],
        assigned: [],
        dependents: [],
        estimation: {},
        importance: 2,
        state: 1,
    };

    const modalRegistry: Record<string, ModalComponent> = {
        loginModal: { ref: LoginModal },
        registerModal: { ref: SignUpModal },
        passwordModal: { ref: PasswordModal },
        createBoardModal: { ref: CreateBoardModal },
        createStudioModal: { ref: CreateStudioModal },
        taskModal: {
            ref: TaskModal,
            props: { data: taskData, isEdit: false },
        },
    };
    const drawerStore = getDrawerStore();
</script>

<Modal components={modalRegistry} />

<Drawer class="bg-white">
    {#if $drawerStore.id === "settings"}
        <BoardSettings />
    {:else if $drawerStore.id === "studio"}
        <StudioDrawer />
    {:else if $drawerStore.id === "task"}
        <TaskDrawer />
    {/if}
</Drawer>

<AppShell>
    <svelte:fragment slot="header">
        <Navigation />
    </svelte:fragment>
    <svelte:fragment slot="sidebarLeft"></svelte:fragment>
    <svelte:fragment slot="pageHeader"></svelte:fragment>
    <slot />
    <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>
