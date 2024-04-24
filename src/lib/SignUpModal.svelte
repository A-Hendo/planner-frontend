<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { SendHorizontal } from "lucide-svelte";
    import type { SvelteComponent } from "svelte";
    import LoadingButton from "./Components/LoadingButton.svelte";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const data = {
        email: "",
        password: "",
        username: "",
        repeatPassword: "",
    };

    function onFormSubmit(): void {
        if ($modalStore[0].response) $modalStore[0].response(data);
        modalStore.close();
    }
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
    <header class="text-2xl font-bold text-center">Sign up to Lemony</header>
    <form class="p-4 space-y-4 rounded-container-token">
        <label class="label">
            <span>Display Name</span>
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
                bind:value={data.password}
            />
        </label>
        <footer class="modal-footer {parent.regionFooter}">
            <LoadingButton
                class="btn variant-filled-primary order-last m-1"
                text="Sign up"
                icon={SendHorizontal}
                on:click={onFormSubmit}
            ></LoadingButton>
            <button class="btn variant-ghost m-1" on:click={parent.onClose}
                >{parent.buttonTextCancel}</button
            >
        </footer>
    </form>
</div>
