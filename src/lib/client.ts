import { goto } from "$app/navigation";
import {
    accessToken,
    isLoggedIn,
    refreshToken,
    tokenExpiry,
    user
} from "$lib/Stores/User";
import axios from "axios";
import { get } from "svelte/store";

export const Client = axios.create({
    baseURL: "http://localhost:8000/v0",
})

function createAxiosRequestInterceptor() {
    const interceptor = Client.interceptors.request.use(
        (config) => {
            console.log(`Logged in: ${get(isLoggedIn)}`);
            if (new Date().getTime() >= get(tokenExpiry)) {
                Client.interceptors.request.eject(interceptor);
                Client.get("/refresh", { headers: { Authorization: `Bearer ${get(refreshToken)} ` } }).then(response => {
                    accessToken.set(response.data.access);
                    console.log("Updated access token");
                    isLoggedIn.set(true);
                }).catch(error => { isLoggedIn.set(false); }).finally(createAxiosRequestInterceptor);
            }

            if (get(accessToken) && config.url !== "/refresh")
                config.headers.Authorization = `Bearer ${get(accessToken)}`
            return config;
        },
        (error) => { return Promise.reject(error) }
    );
}
createAxiosRequestInterceptor();


export async function Logout() {
    isLoggedIn.set(false);
    accessToken.set("");
    refreshToken.set("");
    user.set("");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("refresh_token");
    await goto("/");
}