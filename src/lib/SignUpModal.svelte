<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { SendHorizontal } from "lucide-svelte";
    import type { SvelteComponent } from "svelte";
    import LoadingButton from "./Components/LoadingButton.svelte";
    import { Client } from "./client";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    let data = {
        email: "",
        password: "",
        username: "",
        password_repeat: "",
    };

    async function onFormSubmit(): Promise<void> {
        const response = await Client.post("/register", data);

        if (response.status === 201) {
            modalStore.close();
        }
    }
</script>

<div class="relative card p-4 w-modal-slim shadow-xl space-y-4">
    <header class="text-2xl font-bold text-center">Sign up to NAME</header>
    <button
        class="btn-icon absolute -top-3 -right-0 z-1 focus:outline-0"
        on:click={parent.onClose}>✕</button
    >
    <form
        class="p-4 space-y-4 rounded-container-token"
        on:submit={onFormSubmit}
    >
        <label class="label">
            <span>Username</span>
            <input
                required
                class="input p-1"
                type="text"
                bind:value={data.username}
            />
        </label>
        <label class="label">
            <span>Email</span>
            <input
                required
                class="input p-1"
                type="email"
                bind:value={data.email}
            />
        </label>
        <label class="label">
            <span>Password</span>
            <input
                required
                class="input p-1"
                type="password"
                bind:value={data.password}
            />
        </label>
        <label class="label">
            <span>Repeat Password</span>
            <input
                required
                class="input p-1"
                type="password"
                bind:value={data.password_repeat}
            />
        </label>
        <footer class="modal-footer {parent.regionFooter}">
            <LoadingButton
                class="btn btn-sm variant-filled-primary order-last m-1 w-full"
                text="Sign up"
                icon={SendHorizontal}
            ></LoadingButton>
        </footer>
    </form>
</div>
