<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  let categories = [];
  let loading = true;
  let error = null;

  async function fetchCategories() {
    try {
      loading = true;
      const response = await fetch(`${import.meta.env.VITE_API}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      categories = await response.json();
      error = null;
    } catch (err) {
      error = err.message;
      console.error("Failed to fetch categories:", err);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchCategories();
  });
</script>

<div class="bg-white min-h-screen">
  <div class="mx-auto max-w-2xl px-2 py-4 sm:px-3 sm:py-8 lg:max-w-7xl lg:px-4">
    <!-- Header -->
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4">
      All Categories
    </h2>

    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300"
          >Loading categories...</span
        >
      </div>
    {:else if error}
      <div
        class="bg-red-50 border border-red-200 rounded-md p-4 dark:bg-red-900/20 dark:border-red-700"
      >
        <div class="flex">
          <svg
            class="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800 dark:text-red-400">
              Error loading categories
            </h3>
            <p class="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      </div>
    {:else if categories.length === 0}
      <div class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-4 0H9m-4 0h4m4 0a2 2 0 012-2 2 2 0 012 2m-6 0a2 2 0 012-2 2 2 0 012 2m-6 0a2 2 0 012-2 2 2 0 012 2"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          No categories
        </h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          No categories found.
        </p>
      </div>
    {:else}
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
      >
        {#each categories as category}
          <a
            class="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
            href={`/categories/${category.slug}`}
            use:link
          >
            <div class="p-4 md:p-5">
              <div class="flex justify-between items-center gap-x-3">
                <div class="grow">
                  <div class="flex items-center gap-x-3">
                    <div class="text-xl">{category.icon}</div>

                    <div class="grow">
                      <h3
                        class="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-neutral-400 dark:text-neutral-200"
                      >
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div>
                  <svg
                    class="shrink-0 size-5 text-gray-800 dark:text-neutral-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
                  >
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>
