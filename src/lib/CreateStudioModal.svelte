<script lang="ts">
    import { getModalStore } from "@skeletonlabs/skeleton";
    import { SquarePlus } from "lucide-svelte";
    import type { SvelteComponent } from "svelte";
    import LoadingButton from "./Components/LoadingButton.svelte";
    import { GetStudios } from "./Stores/Studios";
    import { Client } from "./client";

    export let parent: SvelteComponent;

    const modalStore = getModalStore();
    const data = {
        name: "",
    };
    let isLoading = false;

    async function onFormSubmit() {
        isLoading = true;
        Client.post("/studio", data)
            .then(async () => {
                await GetStudios();
                modalStore.close();
            })
            .catch((error) => console.log(error));
        isLoading = false;
    }
</script>

<div class="card p-4 shadow-xl space-y-4">
    <header class="text-2xl font-bold text-center">Create Studio</header>
    <form
        on:submit={onFormSubmit}
        class="border border-surface-500 p-4 space-y-4 rounded-container-token"
    >
        <label class="label">
            <span>Studio Name</span>
            <input
                required
                class="input p-1"
                type="text"
                bind:value={data.name}
            />
        </label>
        <footer class="modal-footer {parent.regionFooter}">
            <button class="btn variant-ghost" on:click={parent.onClose}
                >{parent.buttonTextCancel}</button
            >
            <LoadingButton
                class="btn variant-filled-primary order-last"
                text="Create"
                icon={SquarePlus}
                {isLoading}
            />
        </footer>
    </form>
</div>
