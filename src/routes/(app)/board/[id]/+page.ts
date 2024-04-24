import { GetBoard } from '$lib/Stores/Boards';
import { GetTasks } from '$lib/Stores/Tasks';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    await GetBoard(params.id);
    await GetTasks(params.id);

    return;
};