<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
</script>

<main>
  <div>
    <img src="{viteLogo}" alt="Vite logo" class="h-32 w-32" />
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <img src="{svelteLogo}" alt="Svelte logo" class="h-32 w-32" />
  </div>
</main>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
