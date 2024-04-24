import { Client } from "$lib/client";
import type { Board } from "$lib/types";
import { writable } from "svelte/store";

export const boards = writable<[Board]>();
export const board = writable<Board>();

export async function GetBoards() {
    const response = await Client.get("/board")
    if (response.status !== 200)
        return;
    boards.set(response.data);
}


export async function GetBoard(id: string) {
    const response = await Client.get(`board/${id}`)
    if (response?.status !== 200)
        return;
    board.set(response.data);
}