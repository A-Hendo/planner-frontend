<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { Plus } from "lucide-svelte";

    const modalStore = getModalStore();
    const createBoardModal: ModalSettings = {
        type: "component",
        component: "createBoardModal",
    };
</script>

<button
    type="button"
    on:click={() => modalStore.trigger(createBoardModal)}
    class="card card-hover p-4 w-full h-full flex justify-center content-center"
>
    <Plus size="50" class="self-center" />
</button>
