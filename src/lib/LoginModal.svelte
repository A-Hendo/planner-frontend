<script lang="ts">
    import { goto } from "$app/navigation";
    import {
        accessToken,
        isLoggedIn,
        refreshToken,
        user,
    } from "$lib/Stores/User";
    import { getModalStore } from "@skeletonlabs/skeleton";
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
    };
    const modalStore = getModalStore();

    let onLogin: Promise;

    async function onFormSubmit(): Promise {
        try {
            isLoading = true;
            const response = await Client.post("/login", data);
            accessToken.set(response.data.access);
            refreshToken.set(response.data.refresh);
            isLoggedIn.set(true);
            modalStore.close();
            GetUserInfo();
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
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    }
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
    <header class="text-2xl font-bold text-center">Log in to Lemony</header>
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
        <footer class="modal-footer justify-end {parent.regionFooter}">
            <LoadingButton
                text="Log in"
                icon={SendHorizontal}
                {isLoading}
                class="btn variant-filled-primary order-last m-1"
            />
            <button
                class="btn variant-ghost order-0 m-1"
                on:click={parent.onClose}>{parent.buttonTextCancel}</button
            >
        </footer>
    </form>
</div>
