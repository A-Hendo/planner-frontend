import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

let _access = browser ? localStorage.getItem("access_token") : "";
let _refresh = browser ? localStorage.getItem("refresh_token") : "";
let _expiry: number = browser ? localStorage.getItem("token_expiry") : 0;
let _user = browser ? (localStorage.getItem("user")) : "";

// export const accessToken: Writable<string> = localStorageStore("Access Token", _access ? _access : "");
// export const refreshToken: Writable<string> = localStorageStore("Refresh Token", _refresh ? _refresh : "");
export const accessToken = writable<string>(_access ? _access : "");
export const refreshToken = writable<string>(_refresh ? _refresh : "");
export const tokenExpiry = writable<number>(_expiry ? _expiry : 0);
export const isLoggedIn = writable<boolean>(false);
export const user = writable<any>(_user ? JSON.parse(_user) : "");


accessToken.subscribe((value) => {
    if (value) {
        localStorage.setItem('access_token', value);
        const now = new Date().getTime();
        tokenExpiry.set(now + 840000)
    }
});


refreshToken.subscribe((value) => {
    if (value) localStorage.setItem('refresh_token', value);
});

user.subscribe((value) => {
    if (value) localStorage.setItem('user', JSON.stringify(value));
});
