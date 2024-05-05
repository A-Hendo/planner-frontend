<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<script lang="ts">
    import { page } from "$app/stores";
    import {
        getDrawerStore,
        type DrawerSettings,
    } from "@skeletonlabs/skeleton";
    import { Bug, FilePlus, Plus, X } from "lucide-svelte";
    import { dndzone, type DndEvent, type Item } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { GetTasks, tasks } from "./Stores/Tasks";
    import { Client } from "./client";

    const flipDurationMs = 200;

    let columnItems = $tasks;
    tasks.subscribe(() => (columnItems = $tasks));

    let inlineTaskData = {
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

    function handleDndConsiderColumns(e: any) {
        columnItems = e.detail.items;
    }

    function handleDndFinalizeColumns(e: { detail: { items: any } }) {
        columnItems = e.detail.items;
    }

    function handleDndConsiderCards(cid: any, e: CustomEvent<DndEvent<Item>>) {
        const colIdx = columnItems.findIndex((c) => c.id === cid);
        columnItems[colIdx].items = e.detail.items;
        columnItems = [...columnItems];
    }

    function handleDndFinalizeCards(cid: any, e: CustomEvent<DndEvent<Item>>) {
        const colIdx = columnItems.findIndex((c) => c.id === cid);
        columnItems[colIdx].items = e.detail.items;
        columnItems = [...columnItems];

        let task = e.detail.items.find(
            (value) => value.id === e.detail.info.id,
        );

        const newState = colIdx + 1;

        if (task && task.state !== newState) {
            task.state = newState;
            Client.patch(`/task/${task.id}`, task)
                .then()
                .catch((error) => {
                    console.log(error);
                    task.state -= 1;
                });
        }
    }

    const drawerStore = getDrawerStore();

    async function handleClick(id) {
        const task = await GetTask(id);
        if (!task) return;

        const drawers: DrawerSettings = {
            id: "task",
            width: "w-[380px] md:w-[480px]",
            position: "right",
            meta: { data: task },
        };
        drawerStore.open(drawers);
    }

    async function InlineAddTask(id: number) {
        try {
            inlineTaskData.state = id;
            const response = await Client.post(
                `/task/board/${$page.params.id}`,
                inlineTaskData,
            );

            if (response.status === 201) {
                await GetTasks($page.params.id);
                inlineTaskData.title = "";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function GetTask(id: string) {
        const response = await Client.get(`/task/${id}`);
        if (response.status === 200) return response.data;
    }
</script>

<section
    class="flex w-full overflow-x-auto overflow-y-auto"
    use:dndzone={{ items: columnItems, flipDurationMs, type: "columns" }}
    on:consider={handleDndConsiderColumns}
    on:finalize={handleDndFinalizeColumns}
>
    {#each columnItems as column (column.id)}
        <div
            class="flex-col md:basis-1/4 m-4 min-w-[250px] overflow-y-hidden"
            animate:flip={{ duration: flipDurationMs }}
        >
            <div class="card rounded-xl shadow-md">
                <header
                    class={`${column.class} card-header font-bold border-b-4 content-center`}
                >
                    <div class="flex justify-between items-center">
                        <span>
                            {column.name}
                            ({column.items.length})
                        </span>
                        <button
                            class="btn-icon btn-icon-sm bg-initial"
                            on:click={() =>
                                (column.showInlineInput =
                                    !column.showInlineInput)}
                            ><Plus size="18" /></button
                        >
                    </div>
                </header>
                <div>
                    <div class="px-3 py-1.5">
                        {#if column.showInlineInput}
                            <form on:submit={() => InlineAddTask(column.id)}>
                                <input
                                    bind:value={inlineTaskData.title}
                                    class="input text-sm"
                                    type="text"
                                    placeholder="Task title"
                                    autofocus={column.showInlineInput}
                                />
                                <div class="my-2 w-full inline-flex">
                                    <button
                                        type="reset"
                                        class="btn btn-sm variant-ghost-surface w-1/2 mr-1"
                                        on:click={() =>
                                            (column.showInlineInput = false)}
                                        >Cancel <X size="18" /></button
                                    >
                                    <button
                                        type="submit"
                                        class="btn btn-sm variant-filled-primary w-1/2 ml-1"
                                        >Add</button
                                    >
                                </div>
                            </form>
                        {/if}
                    </div>
                    <section
                        class="overflow-y-auto flex flex-col w-full max-h-screen min-h-screen"
                        use:dndzone={{ items: column.items, flipDurationMs }}
                        on:consider={(e) =>
                            handleDndConsiderCards(column.id, e)}
                        on:finalize={(e) =>
                            handleDndFinalizeCards(column.id, e)}
                    >
                        {#each column.items as item (item.id)}
                            <div
                                class="mx-3 my-1.5 hover:ring-2 hover:ring-primary-500 flex rounded-md"
                                animate:flip={{ duration: flipDurationMs }}
                                on:click={() => handleClick(item.id)}
                            >
                                <div
                                    class="py-2 px-1 bg-[#efeff1] w-full flex h-full rounded-md"
                                >
                                    {#if item.type === 1}
                                        <FilePlus
                                            size="18"
                                            class="text-green-600 mx-2 flex-none"
                                        />
                                    {:else}
                                        <Bug
                                            size="18"
                                            class="text-red-600 mx-2 flex-none"
                                        />
                                    {/if}
                                    <div class="inline-flex">
                                        <span class="text-sm text-gray-500">
                                            #{item?.sid}
                                        </span>
                                        <span class="pl-1 text-sm">
                                            {item.title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </section>
                </div>
            </div>
        </div>
    {/each}
</section>
