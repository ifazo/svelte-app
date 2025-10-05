<script>
  import { onMount } from "svelte";
  import { addProductById } from "../stores/index.js";
  
  export let params = {};
  const id = params.id;

  let loading = true;
  let error = null;
  let product = null;

  const API_BASE = "https://ifaz-svelte-server.vercel.app/api";

  async function fetchProduct() {
    loading = true;
    error = null;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      product = await res.json();
      if (!product) throw new Error("Product not found");
    } catch (err) {
      error = err?.message || String(err);
      console.error(err);
    } finally {
      loading = false;
    }
  }

  function handleAdd() {
    // pass product object to store so the cart item has details immediately
    addProductById(product.id, 1);
  }

  onMount(() => {
    fetchProduct();
  });
</script>

<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  {#if loading}
    <div class="text-center py-12">Loading product...</div>
  {:else if error}
    <div class="text-red-600 bg-red-50 p-4 rounded">{error}</div>
  {:else}
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="md:col-span-1">
        {#if product.image}
          <img
            src={product.image}
            alt={product.name ?? product.title}
            class="w-full h-80 object-cover rounded"
          />
        {:else}
          <div
            class="w-full h-80 bg-gray-100 rounded flex items-center justify-center text-gray-400"
          >
            No image
          </div>
        {/if}
      </div>

      <div class="md:col-span-2">
        <h1 class="text-2xl font-bold">{product.name ?? product.title}</h1>
        {#if product.description}
          <p class="mt-4 text-gray-700">{product.description}</p>
        {/if}

        <div class="mt-6 flex items-center gap-4">
          {#if product.price}
            <div class="text-2xl font-semibold text-indigo-600">
              ${product.price}
            </div>
          {/if}
          <button
            on:click={handleAdd}
            class="rounded bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
