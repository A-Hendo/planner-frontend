<script lang="ts">
    import { goto } from "$app/navigation";
    import { studios } from "$lib/Stores/Studios";
    import { Client } from "$lib/client";
    import {
        Avatar,
        getDrawerStore,
        getModalStore,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();
    const index: number = $drawerStore.meta.index;
    const modalStore = getModalStore();
    let members: [];
    let studio = $studios[index];
    let memberEmail: string = "";
    let managerEmail: string = "";

    async function AddMember() {
        const response = await Client.put(`/studio/${studio.id}/member`, {
            email: memberEmail,
        });
    }
    async function DeleteMember() {
        const response = await Client.patch(`/studio/${studio.id}/member`);
    }

    async function GetMembers() {
        const response = await Client.get(`/studio/${studio.id}/members`);
        if (response.status === 200) {
            members = response.data;
            console.log(members);
        }
    }

    async function AddManager() {}
    async function DeleteManager() {}

    async function DeleteStudio() {
        const response = await Client.delete(`/studio/${studio.id}`);
        if (response.status === 200) {
            goto("/studios");
        }
        modalStore.close();
    }

    const modal: ModalSettings = {
        type: "confirm",
        title: "Please Confirm",
        body: "This will delete all tasks associated with this board, are you sure you wish to proceed?",
        response: (r: boolean) => {
            r ? DeleteStudio() : modalStore.close();
        },
    };

    GetMembers();
</script>

<div class="p-2 bg-white h-full">
    <form>
        <h3 class="h3 text-center">{studio.name}</h3>
        <div class="flex flex-col justify-center items-center my-2">
            <Avatar
                src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
                width="w-16"
                rounded="rounded-full"
            />
        </div>

        <!-- <p>Managers</p>
<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <div class="input-group-shim">(icon)</div>
    <input type="search" placeholder="Search..." />
    <button class="variant-filled-secondary">Add</button>
</div>

<ul class="list">
    {#each $studios[index].managers as manager}
        <li>
            <Avatar
                src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
                width="w-6"
                rounded="rounded-full"
            />
            <span class="flex-auto">{manager.username}</span>
        </li>
    {/each}
</ul> -->

        <label class="label">
            <span class="font-bold m-1">Members</span>
            {#if members}
                <ul class="list space-y-2 m-2 py-2">
                    {#each members as member}
                        <li>
                            <Avatar
                                src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
                                width="w-6"
                                rounded="rounded-full"
                            />
                            <span class="flex-auto">{member.username}</span>
                        </li>
                    {/each}
                </ul>
            {/if}
            <div class="m-2 py-4">
                <div
                    class="input-group input-group-divider grid-cols-[1fr_auto]"
                >
                    <input
                        type="email"
                        placeholder="Email..."
                        bind:value={memberEmail}
                    />
                    <button class="variant-filled-primary" on:click={AddMember}
                        >Add</button
                    >
                </div>
            </div>
        </label>

        <div class="space-y-2 my-4">
            <button
                class="my-2 btn variant-ghost-primary"
                on:click={() => modalStore.trigger(modal)}>Delete Board</button
            >
        </div>
    </form>
</div>
