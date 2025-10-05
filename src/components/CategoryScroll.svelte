<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  let categories = $state([]);
  let loading = $state(true);
  let error = $state(null);

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

  // Split categories into two rows of 12 each
  let firstRow = $derived(categories.slice(0, 12));
  let secondRow = $derived(categories.slice(12, 24));
</script>

<div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
  <div class="mx-auto max-w-7xl px-2 sm:px-3 lg:px-4">
    <!-- Header  -->
    <div class="text-center mb-6">
      <h2 class="text-4xl font-bold text-gray-900 mb-3">
        Explore Our Categories
      </h2>
      <p class="text-lg text-gray-600">
        Discover amazing products across all categories
      </p>
    </div>

    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"
        ></div>
        <span class="ml-3 text-gray-600">Loading categories...</span>
      </div>
    {:else if error}
      <div
        class="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-2xl mx-auto"
      >
        <div class="flex items-start gap-3">
          <svg
            class="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <div>
            <h3 class="text-lg font-semibold text-red-800">
              <!-- Error loading categories -->
            </h3>
            <p class="mt-1 text-red-700">{error}</p>
          </div>
        </div>
      </div>
    {:else if categories.length === 0}
      <div class="text-center py-12">
        <svg
          class="mx-auto h-16 w-16 text-gray-400"
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
        <h3 class="mt-4 text-xl font-semibold text-gray-900">No categories</h3>
        <p class="mt-2 text-gray-600">No categories found.</p>
      </div>
    {:else}
      <div class="space-y-8 overflow-hidden">
        <!-- First Row - Left to Right  -->
        <div class="relative">
          <div class="flex gap-6 animate-scroll-left">
            {#each [...firstRow, ...firstRow] as category}
              <a
                use:link
                href={`/categories/${category.slug}`}
                class="group flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary overflow-hidden"
              >
                <div class="p-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="text-5xl bg-gradient-to-br from-primary to-secondary p-4 rounded-xl"
                    >
                      {category.icon}
                    </div>
                    <div class="flex-1">
                      <h3
                        class="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors"
                      >
                        {category.name}
                      </h3>
                      <p class="text-sm text-gray-500 mt-1">
                        Explore collection
                      </p>
                    </div>
                    <svg
                      class="w-6 h-6 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>

        <!-- Second Row - Right to Left  -->
        <div class="relative">
          <div class="flex gap-6 animate-scroll-right">
            {#each [...secondRow, ...secondRow] as category}
              <a
                use:link
                href={`/categories/${category.slug}`}
                class="group flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-secondary overflow-hidden"
              >
                <div class="p-6">
                  <div class="flex items-center gap-4">
                    <div
                      class="text-5xl bg-gradient-to-br from-accent to-warning p-4 rounded-xl"
                    >
                      {category.icon}
                    </div>
                    <div class="flex-1">
                      <h3
                        class="text-xl font-bold text-gray-900 group-hover:text-secondary transition-colors"
                      >
                        {category.name}
                      </h3>
                      <p class="text-sm text-gray-500 mt-1">
                        Explore collection
                      </p>
                    </div>
                    <svg
                      class="w-6 h-6 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes scroll-right {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .animate-scroll-left {
    animation: scroll-left 40s linear infinite;
  }

  .animate-scroll-right {
    animation: scroll-right 40s linear infinite;
  }

  /* Pause animation on hover */
  .animate-scroll-left:hover,
  .animate-scroll-right:hover {
    animation-play-state: paused;
  }
</style>
