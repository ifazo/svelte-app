<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  export let params;
  const slug = params.slug;

  let products = [];
  let loading = true;
  let error = null;

  async function fetchProducts() {
    try {
      loading = true;
      const res = await fetch(
        `${import.meta.env.VITE_API}/products?category=${slug}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      products = data?.products || [];
      error = null;
    } catch (err) {
      error = err.message;
      console.error("Failed to fetch products:", err);
    } finally {
      loading = false;
    }
  }

  onMount(fetchProducts);
</script>

<!-- Page Layout -->
<div class="bg-white min-h-screen">
  <div class="mx-auto max-w-2xl px-2 py-4 sm:px-3 sm:py-8 lg:max-w-7xl lg:px-4">
    <!-- Header -->
    <div class="md:flex md:items-center md:justify-between">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Category products
      </h2>
      <a
        use:link
        href="/categories"
        class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Back to categories
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>

    <!-- Loading & Error States -->
    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300"
          >Loading category products...</span
        >
      </div>
    {:else if error}
      <p class="mt-8 text-red-500">⚠️ {error}</p>
    {:else if products.length === 0}
      <p class="mt-8 text-gray-500">No products found.</p>
    {:else}
      <!-- Product Grid -->
      <div
        class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8"
      >
        {#each products as product}
          <div class="group relative">
            <div
              class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                class="size-full object-cover"
              />
            </div>
            <h3 class="mt-4 text-sm font-semibold text-gray-700">
              <a use:link href={`/products/${product._id}`}>
                <span class="absolute inset-0"></span>
                {product.title}
              </a>
            </h3>
            <div class="mt-1 mb-4 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-500">
                {product.brand || product.category}
              </p>
              <p class="text-sm font-medium text-gray-900">${product.price}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
