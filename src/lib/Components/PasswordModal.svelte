<script lang="ts">
    import LoadingButton from "$lib/Components/LoadingButton.svelte";
    import { Client } from "$lib/client";
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { SendHorizontal } from "lucide-svelte";
    import type { SvelteComponent } from "svelte";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    let data = {
        password: "",
        new_password: "",
        new_password_repeat: "",
    };

    async function onFormSubmit(): Promise<void> {
        const response = await Client.post("/password", data);

        if (response.status === 200) {
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
            <span>Current password</span>
            <input
                required
                class="input p-1"
                type="password"
                bind:value={data.password}
            />
        </label>
        <label class="label">
            <span>New password</span>
            <input
                required
                class="input p-1"
                type="password"
                bind:value={data.new_password}
            />
        </label>
        <label class="label">
            <span>Repeat new password</span>
            <input
                required
                class="input p-1"
                type="password"
                bind:value={data.new_password_repeat}
            />
        </label>
        <footer class="modal-footer {parent.regionFooter}">
            <LoadingButton
                class="btn btn-sm variant-filled-primary order-last m-1 w-full"
                text="Change Password"
                icon={SendHorizontal}
            ></LoadingButton>
        </footer>
    </form>
</div>
