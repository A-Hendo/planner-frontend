import { browser } from "$app/environment";
import { Client } from "$lib/client";
import { isLoggedIn } from "$lib/Stores/User";
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
    if (isPathAllowed(event.url.pathname))
        return await resolve(event);

    if (!get(isLoggedIn) && browser) {
        const response = await Client.get("/validate");
        console.log(response)
        console.log("Hook Logged in " + response.data);
        if (response.data) {
            isLoggedIn.set(true);
            return await resolve(event);
        }
        else if (!response.data) {
            isLoggedIn.set(false);
            throw redirect(302, "/");
        }
    }
    return await resolve(event);

}
