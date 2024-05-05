import { browser } from "$app/environment";
import { accessToken, isLoggedIn } from "$lib/Stores/User";
import { Client, Logout } from "$lib/client";
import { redirect, type Handle } from "@sveltejs/kit";
import { get } from "svelte/store";
const public_paths = [
    '/',
];

function isPathAllowed(path) {
    return public_paths.some(allowedPath =>
        path === allowedPath || path == `${allowedPath}/`
    );
}

export const handle: Handle = async ({ event, resolve }) => {
    console.log("Ini hook");
    if (isPathAllowed(event.url.pathname))
        return await resolve(event);

    if (browser && get(accessToken)) {
        const response = await Client.get("/validate");
        if (response.data) {
            isLoggedIn.set(true);
            return await resolve(event);
        }
        else if (!response.data) {
            throw redirect(302, "/");
        } else if (response.status === 422) {
            Logout();
            throw redirect(302, "/");
        }
    }
    return await resolve(event);

}


