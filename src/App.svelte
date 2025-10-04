<script>
  import Router from "svelte-spa-router";
  import MainLayout from "./layouts/MainLayout.svelte";
  import routes from "./routes.js";
</script>

<MainLayout>
  <Router {routes} />
</MainLayout>

<style lang="postcss">
  @reference "tailwindcss";
  :global(html) {
    background-color: theme(--color-gray-100);
  }
</style>
