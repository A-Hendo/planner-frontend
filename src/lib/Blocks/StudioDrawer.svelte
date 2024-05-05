<script lang="ts">
    import { goto } from "$app/navigation";
    import { GetStudios, studios } from "$lib/Stores/Studios";
    import { Client } from "$lib/client";
    import {
        Avatar,
        getDrawerStore,
        getModalStore,
        type ModalSettings,
    } from "@skeletonlabs/skeleton";
    import { X } from "lucide-svelte";

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
        await GetMembers();
    }

    async function DeleteMember(email: string) {
        const response = await Client.patch(`/studio/${studio.id}/member`, {
            email,
        });
        await GetMembers();
    }

    async function GetMembers() {
        const response = await Client.get(`/studio/${studio.id}/members`);
        if (response.status === 200) {
            members = response.data;
        }
    }

    async function AddManager() {}
    async function DeleteManager() {}

    async function DeleteStudio() {
        const response = await Client.delete(`/studio/${studio.id}`);
        if (response.status === 200) {
            goto("/dashboard");
        }
        modalStore.close();
    }

    const modal: ModalSettings = {
        type: "confirm",
        title: "Please Confirm",
        body: "This will delete all tasks associated with this board, are you sure you wish to proceed?",
        response: async (r: boolean) => {
            r ? await DeleteStudio() : modalStore.close();
        },
    };

    GetMembers();

    async function UpdateSettings() {
        const response = await Client.put(`/studio/${studio.id}`, {
            name: studio.name,
            active: studio.active,
            settings: studio.settings,
        });
        if (response.status === 200) {
            await GetStudios();
        }
    }
</script>

<form
    class="p-2 flex flex-col justify-items-center bg-white h-full"
    on:submit={UpdateSettings}
>
    <h3 class="h3 text-center">{studio.name}</h3>
    <div class="flex flex-col justify-center items-center my-2">
        <Avatar initials={studio.name[0]} width="w-16" rounded="rounded-full" />
    </div>

    <div class="space-y-2 my-2 h-full">
        <label class="label">
            <span class="font-bold m-2">Members</span>
            {#if members}
                <ul class="list space-y-2 m-2">
                    {#each members as member}
                        <li>
                            <Avatar
                                initials={member.username[0]}
                                width="w-6"
                                rounded="rounded-full"
                            />
                            <span class="flex-auto">{member.username}</span>
                            <button
                                type="button"
                                class="btn-icon btn-sm"
                                on:click={() => DeleteMember(member.email)}
                            >
                                <X />
                            </button>
                        </li>
                    {/each}
                </ul>
            {/if}
            <div class="m-2 h-full">
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
        <div class="space-y-2 my-2 h-full py-4">
            <label class="flex items-center space-x-2 m-2">
                <input
                    class="checkbox"
                    type="checkbox"
                    checked={!studio.active}
                    on:change={() => (studio.active = !studio.active)}
                />
                <p>Deactivate</p>
            </label>
        </div>
    </div>

    <div class="my-4 w-full flex-col">
        {#if !studio.active}
            <button
                class="my-2 btn btn-sm variant-ghost-primary w-full"
                on:click={() => modalStore.trigger(modal)}>Delete Studio</button
            >
        {/if}
        <button class="my-2 btn btn-sm w-full variant-filled-primary"
            >Save Settings</button
        >
    </div>
</form>
