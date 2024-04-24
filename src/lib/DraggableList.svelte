<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<script lang="ts">
    import { page } from "$app/stores";
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { Bug, FilePlus, Plus, X } from "lucide-svelte";
    import { dndzone, type DndEvent, type Item } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import { Client } from "./client";
    import { GetTasks, tasks } from "./Stores/Tasks";

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
            Client.put(`/task/${e.detail.info.id}`, task)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        }
    }

    const modalStore = getModalStore();

    function handleClick(column, id) {
        const task = columnItems[column].items.find((value) => value.id === id);
        const taskModal: ModalSettings = {
            type: "component",
            component: "taskModal",
            meta: { data: task },
        };
        modalStore.trigger(taskModal);
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
</script>

<section
    class="flex flex-row w-full overflow-x-auto"
    use:dndzone={{ items: columnItems, flipDurationMs, type: "columns" }}
    on:consider={handleDndConsiderColumns}
    on:finalize={handleDndFinalizeColumns}
>
    {#each columnItems as column (column.id)}
        <div
            class="flex-col basis-1/4 m-4"
            animate:flip={{ duration: flipDurationMs }}
        >
            <div class="card min-h-screen rounded-lg">
                <header
                    class="card-header font-bold border-b-2 border-surface-500 content-center"
                >
                    <div class="flex items-stretch justify-between">
                        <span>
                            {column.name}
                            ({column.items.length})
                        </span>
                        <div class="">
                            <button
                                class="btn-icon btn-icon-sm bg-initial float-end"
                                on:click={() =>
                                    (column.showInlineInput =
                                        !column.showInlineInput)}
                                ><Plus size="18" /></button
                            >
                        </div>
                    </div>
                </header>
                <div
                    class={`mx-3 my-1.5 ${column.showInlineInput ? undefined : "hidden"}`}
                >
                    <form class="w-full">
                        <input
                            bind:value={inlineTaskData.title}
                            class="input"
                            type="text"
                            placeholder="Task title"
                        />
                        <div class="my-2 w-full inline-flex">
                            <button
                                class="btn btn-sm variant-ghost-surface w-1/2 mr-1"
                                on:click={() =>
                                    (column.showInlineInput = false)}
                                >Cancel <X size="18" /></button
                            >
                            <button
                                class="btn btn-sm variant-filled-primary w-1/2 ml-1"
                                on:click={() => InlineAddTask(column.id)}
                                >Add</button
                            >
                        </div>
                    </form>
                </div>
                <section
                    class="overflow-y flex flex-col min-h-screen w-full"
                    use:dndzone={{ items: column.items, flipDurationMs }}
                    on:consider={(e) => handleDndConsiderCards(column.id, e)}
                    on:finalize={(e) => handleDndFinalizeCards(column.id, e)}
                >
                    {#each column.items as item (item.id)}
                        <div
                            class="mx-3 my-1.5 hover:variant-ghost flex rounded-md"
                            animate:flip={{ duration: flipDurationMs }}
                            on:click={() =>
                                handleClick(
                                    columnItems.indexOf(column),
                                    item.id,
                                )}
                        >
                            <div
                                class="p-2 variant-soft-surface w-full flex h-full rounded-md"
                            >
                                {#if item.type === 1}
                                    <FilePlus
                                        class="text-green-600 w-4 h-4 mx-2"
                                    />
                                {:else}
                                    <Bug class="text-red-600 w-4 h-4 mx-2" />
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
    {/each}
</section>
