<script lang="ts">
    import { Check, SendHorizonal } from "lucide-svelte";
    let yearly: boolean = false;
</script>

<div id="pricing" class="py-16 bg-slate-50">
    <div class="text-center">
        <h2 class="text-3xl font-bold my-10">Pricing</h2>
    </div>
    <div
        class="mx-auto my-16 justify-center flex flex-col lg:flex-row items-center gap-5 text-center"
    >
        <div class="card p-4 mx-5 w-full sm:max-w-xl md:max-w-lg">
            <div class="card-header">
                {#if yearly}
                    <div class="mb-4">
                        <h1 class="h3">Personal</h1>
                    </div>
                    <div class="h2">
                        <span>£0</span>
                    </div>
                    <span class="text-sm text-gray-400">per year</span>
                {:else}
                    <div class="mb-4">
                        <h1 class="h3">Personal</h1>
                    </div>
                    <div class="h2">
                        <span>£0</span>
                    </div>
                    <span class="text-sm text-gray-400">per month</span>
                {/if}
            </div>
            <section class="text-center">
                <ul>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        /> List item
                    </li>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        /> List item
                    </li>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        /> List item
                    </li>
                </ul>
            </section>
            <div class="card-footer">
                {#if yearly}
                    <a
                        class="btn btn-sm justify-center w-full variant-filled-primary"
                        href="#"
                    >
                        Try now!
                    </a>
                {:else}
                    <a
                        class="btn btn-sm justify-center w-full variant-filled-primary"
                        href="#"
                    >
                        Try now!
                    </a>
                {/if}
            </div>
        </div>
        <div class="card p-4 mx-5 w-full max-w-lg lg:w-1/3">
            <div class="card-header">
                {#if yearly}
                    <div class="mb-4">
                        <h1 class="h3">Pro</h1>
                    </div>
                    <div class="h2">
                        <span>£48</span>
                    </div>
                    <span class="text-sm text-gray-400">per year</span>
                {:else}
                    <div class="mb-4">
                        <h1 class="h3">Pro</h1>
                    </div>
                    <div class="h2">
                        <span>£5</span>
                    </div>
                    <span class="text-sm text-gray-400">per month</span>
                {/if}
            </div>
            <section class="text-center">
                <ul>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        />
                    </li>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        />
                    </li>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        />
                    </li>
                </ul>
            </section>
            <div class="card-footer">
                {#if yearly}
                    <a
                        class="btn btn-sm justify-center w-full variant-filled-primary"
                        href="#"
                    >
                        Try now!<SendHorizonal size="18" class="ml-2" />
                    </a>
                {:else}
                    <a
                        class="btn btn-sm justify-center w-full variant-filled-primary"
                        href="#"
                    >
                        Try now!<SendHorizonal size="18" class="ml-2" />
                    </a>
                {/if}
            </div>
        </div>
        <div class="card p-4 mx-5 w-full max-w-lg lg:w-1/3">
            <div class="card-header">
                {#if yearly}
                    <div class="mb-4">
                        <h1 class="h3">Studio</h1>
                    </div>
                    <div class="h2">
                        <span>£72</span>
                    </div>
                    <span class="text-sm text-gray-400">per seat / year</span>
                {:else}
                    <div class="mb-4">
                        <h1 class="h3">Studio</h1>
                    </div>
                    <div class="h2">
                        <span>£8</span>
                    </div>
                    <span class="text-sm text-gray-400">per seat / month</span>
                {/if}
            </div>
            <section class="text-center">
                <ul>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        />
                    </li>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        />
                    </li>
                    <li class="my-3">
                        <Check
                            size="18"
                            class="inline-block mr-2 text-primary-600"
                        />
                    </li>
                </ul>
            </section>
            <div class="card-footer">
                {#if yearly}
                    <a
                        class="btn btn-sm justify-center w-full variant-filled-primary"
                        href="#"
                    >
                        Try now!<SendHorizonal size="18" class="ml-2" />
                    </a>
                {:else}
                    <a
                        class="btn btn-sm justify-center w-full variant-filled-primary"
                        href="#"
                    >
                        Try now!<SendHorizonal size="18" class="ml-2" />
                    </a>
                {/if}
            </div>
        </div>
    </div>
</div>
