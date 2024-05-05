<script lang="ts">
    import { page } from "$app/stores";
    import LoadingButton from "$lib/Components/LoadingButton.svelte";
    import { GetTasks } from "$lib/Stores/Tasks";
    import {
        InputChip,
        ListBox,
        ListBoxItem,
        popup,
        type PopupSettings,
    } from "@skeletonlabs/skeleton";
    import { Search } from "lucide-svelte";

    let tags: string[] = [];
    let state: string = "0";
    let type: string = "0";
    let group: string = "";
    let isLoading = false;

    async function TaskParams() {
        let params = "";

        if (type !== "0") params += `type=${type}&`;

        if (state !== "0") params += `state=${state}&`;

        if (group) params += `group=${group}&`;

        if (tags.length > 0) params += `tags__in=${tags.join(",")}&`;

        await GetTasks($page.params.id, params);
    }

    function ClearParams() {
        tags = [];
        state = "0";
        type = "0";
        group = "";
    }
</script>

<form on:submit={TaskParams} class="card p-4 shadow-xl">
    <label class="label">
        <span class="font-medium text-gray-600">Type</span>
        <select class="select py-0" bind:value={type}>
            <option class="bg-white" value="0">All</option>
            <option class="bg-white" value="1">Task</option>
            <option class="bg-white" value="2">Bug</option>
        </select>
    </label>
    <label class="label mt-4">
        <span class="font-medium text-gray-600">State</span>
        <select class="select py-0" bind:value={state}>
            <option value="0">All</option>
            <option value="1">To do</option>
            <option value="2">In progress</option>
            <option value="3">In Review</option>
            <option value="4">Done</option>
        </select>
    </label>
    <label class="label mt-6">
        <span class="font-medium text-gray-600">Groups</span>
        <input
            class="input"
            title="Input (text)"
            type="text"
            placeholder="Search groups"
            bind:value={group}
        />
    </label>
    <label class="label mt-6">
        <span class="font-medium text-gray-600">Tags</span>
        <InputChip bind:value={tags} name="chips" placeholder="Search tags" />
    </label>
    <LoadingButton
        id="search"
        class="btn btn-sm variant-filled-primary w-full mt-6"
        text="Search"
        {isLoading}
        icon={Search}
    />
    <button
        id="clear"
        class="btn btn-sm variant-glass-surface w-full mt-2"
        on:click={ClearParams}>Clear</button
    >
</form>
