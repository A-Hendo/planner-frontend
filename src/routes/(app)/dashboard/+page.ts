import { browser } from '$app/environment';
import { GetBoards } from '$lib/Stores/Boards';
import { GetStudios } from '$lib/Stores/Studios';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    if (browser) {
        await GetBoards();
        await GetStudios();
    }
};