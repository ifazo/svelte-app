<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  let products = [];
  let loading = true;
  let error = null;

  async function fetchProducts() {
    try {
      loading = true;
      const res = await fetch(`${import.meta.env.VITE_API}/products`);
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

  // helper: render rating stars
  const getStars = (rating) => {
    const stars = [];
    const full = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(i < full);
    }
    return stars;
  };
</script>

<!-- Page Layout -->
<div class="bg-white min-h-screen">
  <div class="mx-auto max-w-2xl px-2 py-4 sm:px-3 sm:py-8 lg:max-w-7xl lg:px-4">
    <!-- Header -->
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-4">
      All Products
    </h2>

    {#if loading}
      <div class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300"
          >Loading products...</span
        >
      </div>
    {:else if error}
      <p class="text-red-500 text-center mt-10">⚠️ {error}</p>
    {:else if products.length === 0}
      <p class="text-gray-500 text-center mt-10">No products found.</p>
    {:else}
      <div
        class="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
      >
        {#each products as product}
          <div
            class="group relative border-r border-b border-gray-200 p-4 sm:p-6"
          >
            <!-- Image -->
            <img
              src={product.thumbnail}
              alt={product.title}
              class="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
            />

            <!-- Product info -->
            <div class="pt-10 pb-4 text-center">
              <h3 class="text-sm font-medium text-gray-900">
                <a use:link href={`/products/${product._id}`}>
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {product.title}
                </a>
              </h3>

              <!-- Rating -->
              <div class="mt-3 flex flex-col items-center">
                <p class="sr-only">{product.rating} out of 5 stars</p>
                <div class="flex items-center">
                  {#each getStars(product.rating) as filled}
                    {#if filled}
                      <svg
                        class="size-5 shrink-0 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    {:else}
                      <svg
                        class="size-5 shrink-0 text-gray-200"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    {/if}
                  {/each}
                </div>
                <p class="mt-1 text-sm text-gray-500">
                  {product.reviews?.length || 0} reviews
                </p>
              </div>

              <!-- Price -->
              <p class="mt-4 text-base font-medium text-gray-900">
                ${product.price}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
