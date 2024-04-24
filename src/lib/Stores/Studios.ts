import { Client } from "$lib/client";
import type { Studio } from "$lib/types";
import { writable } from "svelte/store";

export const studios = writable<[Studio]>();

export async function GetStudios() {
    const response = await Client.get("/studio")
    if (response?.status !== 200)
        return;
    studios.set(response.data);
}