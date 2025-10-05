<script>
  import { onMount } from "svelte";
  import { addProductById } from "../stores/index.js";

  let products = [];
  let loading = true;
  let error = null;

  async function fetchProducts() {
    try {
      loading = true;
      const res = await fetch("https://ifaz-svelte-server.vercel.app/api/products");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log(data);
      products = data?.products;
      error = null;
    } catch (err) {
      error = err.message;
      console.error("Failed to fetch products:", err);
    } finally {
      loading = false;
    }
  }

  function handleAddToCart(product) {
    addProductById(product._id, 1);
  }

  onMount(() => {
    fetchProducts();
  });
</script>

<div class="py-8">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold text-gray-900">Products</h1>
    <button
      on:click={fetchProducts}
      class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Refresh
    </button>
  </div>

  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <span class="ml-3 text-gray-600">Loading products...</span>
    </div>
  {:else if error}
    <div class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading products</h3>
          <p class="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  {:else if products.length === 0}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-4 0H9m-4 0h4m4 0a2 2 0 012-2 2 2 0 012 2m-6 0a2 2 0 012-2 2 2 0 012 2m-6 0a2 2 0 012-2 2 2 0 012 2" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No products</h3>
      <p class="mt-1 text-sm text-gray-500">No products found.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each products as product}
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          {#if product.image}
            <img src={product.image} alt={product.name || product.title || 'product'} class="w-full h-40 object-cover rounded mb-4" />
          {/if}
          <h2 class="text-xl font-semibold mb-2">{product.name ?? product.title ?? 'Untitled'}</h2>
          {#if product.description}
            <p class="text-gray-600 mb-4 text-sm">{product.description}</p>
          {/if}
          <div class="flex items-center justify-between text-sm text-gray-700">
            {#if product.price}
              <div class="font-semibold text-indigo-600">${product.price}</div>
            {/if}
            <button
            on:click={() => handleAddToCart(product)}
            class="mt-auto w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
          >
            Add to Cart
          </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>