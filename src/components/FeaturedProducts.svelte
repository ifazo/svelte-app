<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  let products = [];
  let loading = true;
  let error = null;

  async function fetchProducts() {
    try {
      loading = true;
      const res = await fetch(`${import.meta.env.VITE_API}/products/random`);
      const data = await res.json();

      products = data || [];
      error = null;
    } catch (err) {
      error = err.message;
      console.error("Failed to fetch products:", err);
    } finally {
      loading = false;
    }
  }

  onMount(fetchProducts);

  // Helper: render rating stars
  const getStars = (rating) => {
    const stars = [];
    const full = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(i < full);
    }
    return stars;
  };
</script>

<div class="bg-white">
  <div class="py-8 sm:py-12 lg:mx-auto lg:max-w-7xl lg:px-8">
    <div class="flex items-center justify-between px-4 sm:px-6 lg:px-0">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">
        Featured products
      </h2>
      <a
        use:link
        href="/products"
        class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
      >
        See all
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>

    <!-- Loading / Error / Product Grid -->
    <div class="relative mt-8">
      {#if loading}
        <p class="text-center text-gray-500 py-10">Loading products...</p>
      {:else if error}
        <p class="text-center text-red-600 py-10">Error: {error}</p>
      {:else if products.length === 0}
        <p class="text-center text-gray-500 py-10">No products found.</p>
      {:else}
        <div class="relative -mb-6 w-full overflow-x-auto pb-6">
          <ul
            role="list"
            class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0"
          >
            {#each products as product (product._id)}
              <li class="inline-flex w-64 flex-col text-center lg:w-auto">
                <div class="group relative">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
                  />
                  <div class="mt-3">
                    <h3 class="mt-1 font-semibold text-gray-900">
                      <a use:link href={`/products/${product._id}`}>
                        <span class="absolute inset-0"></span>
                        {product.title.length > 20
                          ? product.title.slice(0, 20) + "..."
                          : product.title}
                      </a>
                    </h3>
                    <p class="mt-1 font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>

                <!-- Rating -->
                <div class="mt-1 flex flex-col items-center">
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
                  <!-- <p class="mt-1 text-sm text-gray-500">
                    {product.reviews?.length || 0} reviews
                  </p> -->
                </div>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>

    <div class="mt-12 flex px-4 sm:hidden">
      <a
        use:link
        href="/products"
        class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        See all
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  </div>
</div>
