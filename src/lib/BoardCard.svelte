<script lang="ts">
    export let id: string;
    export let title: string;
</script>

<a href="/board/{id}">
    <div
        class="block card card-hover p-4 text-center font-bold text-lg text-wrap w-full h-full truncate"
    >
        {title}
    </div>
</a>
