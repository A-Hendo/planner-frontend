<script lang="ts">
    import { Client } from "$lib/client";
    import {
        accessToken,
        isLoggedIn,
        refreshToken,
        user,
    } from "$lib/Stores/User";
    import { onMount } from "svelte";
    let savestore = false;

    $: if (savestore && $user) {
        window.sessionStorage.setItem("user", JSON.stringify($user));
    }

    $: if (savestore && $refreshToken) {
        window.sessionStorage.setItem("refresh_token", $refreshToken);
    }

    $: if (savestore && $accessToken) {
        window.sessionStorage.setItem("access_token", $accessToken);
    }

    onMount(async () => {
        let userSession = window.sessionStorage.getItem("user");
        if (userSession) {
            user.set(JSON.parse(userSession));
        }

        let refershSession = window.sessionStorage.getItem("refresh_token");
        if (refershSession) {
            refreshToken.set(refershSession);
        }

        let accessSession = window.sessionStorage.getItem("access_token");
        if (accessSession) {
            accessToken.set(accessSession);
        }
        savestore = true;
        console.log("sob-- ~ loading sessions");

        const response = await Client.get("validate");
        if (response.data) isLoggedIn.set(true);
    });
</script>
