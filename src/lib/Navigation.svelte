<script lang="ts">
    import { Logout } from "$lib/client";
    import {
        Avatar,
        LightSwitch,
        getModalStore,
        popup,
        type ModalSettings,
        type PopupSettings,
    } from "@skeletonlabs/skeleton";
    import { isLoggedIn, user } from "./Stores/User";

    const modalStore = getModalStore();
    const loginModal: ModalSettings = {
        type: "component",
        component: "loginModal",
    };
    const registerModal: ModalSettings = {
        type: "component",
        component: "registerModal",
    };
    const accountPopup: PopupSettings = {
        event: "click",
        target: "accountPopup",
        placement: "bottom",
        closeQuery: "#sign-out",
    };

    async function HandleLogout() {
        modalStore.close();
        await Logout();
    }
</script>

<nav class="bg-white p-2 border-b-1 flex justify-between content-center">
    <div class="flex self-center">
        <!-- <img alt="logo" src="./favicon.png" class="w-5" /> -->
        <h1 class="font-bold">Lemonaid</h1>
    </div>
    {#if $isLoggedIn}
        <div class="self-center font-bold">
            <a href="/" class="btn">Home</a>
            <a href="/dashboard" class="btn">Dashboard</a>
        </div>
        <div use:popup={accountPopup}>
            <Avatar
                src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
                width="w-10"
                rounded="rounded-full"
            />
        </div>
    {:else}
        <div class="self-center font-bold">
            <a href="/" class="btn">Home</a>
            <a href="/pricing" class="btn">Pricing</a>
            <a href="/about" class="btn">About</a>
            <a href="/contact" class="btn">Contact</a>
        </div>
        <div class="float-right">
            <button
                type="button"
                class="btn variant-ghost-primary"
                on:click={() => modalStore.trigger(registerModal)}
                >Sign Up</button
            >
            <button
                type="button"
                class="btn variant-filled-primary"
                on:click={() => modalStore.trigger(loginModal)}>Login</button
            >
        </div>
    {/if}
</nav>

<div class="card p-4 w-72 shadow-xl" data-popup="accountPopup">
    <div class="arrow bg-surface-100-800-token" />
    <div class="flex flex-col w-full">
        <div class="m-2 flex-row w-full">
            <LightSwitch class="float-right" />
        </div>
        <div class="flex m-2 flex-col justify-center items-center">
            <Avatar
                src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
                width="w-16"
                rounded="rounded-full"
            />
            <span>{$user?.username}</span>
        </div>
        <div class="m-2 flex flex-col hidden">
            <button
                type="button"
                class="btn variant-ghost-primary"
                on:click={Logout}>Change Password</button
            >
        </div>
        <div class="m-2 flex flex-col">
            <button
                id="sign-out"
                type="button"
                class="btn variant-secondary-surface"
                on:click={HandleLogout}>Sign out</button
            >
        </div>
    </div>
</div>
