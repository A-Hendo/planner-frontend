import { Client } from "$lib/client";
import { writable } from "svelte/store";

export const tasks = writable<[]>([]);

export async function GetTasks(id: string) {
    const response = await Client.get(`/task/board/${id}`)
    if (response.status !== 200)
        return;

    let todo: any[] = [];
    let inProgress: any[] = [];
    let verification: any[] = [];
    let done: any[] = [];

    response.data.forEach((element: any) => {
        if (element.state === 1) {
            todo.push(element);
        } else if (element.state === 2) {
            inProgress.push(element);
        } else if (element.state === 3) {
            verification.push(element);
        } else if (element.state === 4) {
            done.push(element);
        }
    });
    let buildTasks = [
        { id: 1, name: "To Do", items: todo, showInlineInput: false },
        { id: 2, name: "In Progress", items: inProgress, showInlineInput: false },
        { id: 3, name: "In Review", items: verification, showInlineInput: false },
        { id: 4, name: "Done", items: done, showInlineInput: false },
    ];
    tasks.set(buildTasks);
}