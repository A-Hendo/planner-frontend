<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        accessToken,
        isLoggedIn,
        refreshToken,
        user,
    } from "$lib/Stores/User";
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { AxiosError } from "axios";
    import { SendHorizontal, TriangleAlert } from "lucide-svelte";
    import type { SvelteComponent } from "svelte";
    import LoadingButton from "./Components/LoadingButton.svelte";
    import { Client } from "./client";

    export let parent: SvelteComponent;

    let isLoading = false;
    const data = {
        email: "",
        password: "",
        redirect: false,
    };
    const modalStore = getModalStore();

    let onLogin: Promise<void>;

    async function onFormSubmit(): Promise<void> {
        try {
            isLoading = true;
            const response = await Client.post("/login", data);
            accessToken.set(response.data.access);
            refreshToken.set(response.data.refresh);
            isLoggedIn.set(true);
            modalStore.close();
            GetUserInfo();
            if ($user?.password_expired) {
                modalStore.trigger(passwordModal);
            }
            await goto("/dashboard");
        } catch (error) {
            if (error.response?.status === 400) {
                throw new AxiosError(
                    "Please provide a valid email address and password.",
                );
            }
        } finally {
            isLoading = false;
        }
    }

    function GetUserInfo(): void {
        Client.get("/user")
            .then((response) => {
                user.set(response.data);
                $user.initials = $user.username
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("");
            })
            .catch((error) => console.log(error));
    }

    export const registerModal: ModalSettings = {
        type: "component",
        component: "registerModal",
    };

    const passwordModal: ModalSettings = {
        type: "component",
        component: "passwordModal",
    };
</script>

<div class="relative card p-4 w-modal-slim shadow-xl space-y-4">
    <button
        class="btn-icon bg-transparent absolute -top-1 -right-1 z-1 focus:outline-0"
        on:click={parent.onClose}>✕</button
    >
    <header class="text-2xl font-bold text-center align-center justify-center">
        Log in to NAME
    </header>
    <form
        on:submit={() => (onLogin = onFormSubmit())}
        class="p-4 space-y-4 rounded-container-token"
    >
        <div class="py-2" />
        {#await onLogin catch error}
            <div class="py-2 flex">
                <TriangleAlert class="text-red-600 mx-2" />
                <span>{error.message}</span>
            </div>
        {/await}
        <label class="label">
            <span class="font-bold">Email</span>
            <input
                class="input p-1"
                type="email"
                bind:value={data.email}
                required
            />
        </label>
        <label class="label">
            <span class="font-bold">Password</span>
            <input
                required
                class="input p-1"
                type="password"
                bind:value={data.password}
            />
        </label>
        <footer class="pt-5 modal-footer {parent.regionFooter} flex flex-col">
            <div class="flex flex-col w-full my-1">
                <LoadingButton
                    text="Log in"
                    icon={SendHorizontal}
                    {isLoading}
                    class="btn btn-sm variant-filled-primary order-last m-1 w-full"
                />
            </div>
            <div class="my-1 flex flex-col w-full">
                <button
                    type="button"
                    class="btn btn-sm w-full bg-initial hover:variant-glass-surface"
                    on:click={() => {
                        modalStore.close();
                        modalStore.trigger(registerModal);
                    }}>Don't have an account? Sign up</button
                >
            </div>
        </footer>
    </form>
</div>
