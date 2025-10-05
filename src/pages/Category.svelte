<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  export let params = {};
  const slug = params.slug;

  let loading = true;
  let error = null;
  let category = null;
  let products = [];

  const API_BASE = "https://ifaz-svelte-server.vercel.app/api";

  async function fetchCategoryAndProducts() {
    loading = true;
    error = null;
    try {
      const [catRes, prodRes] = await Promise.all([
        fetch(`${API_BASE}/categories`),
        fetch(`${API_BASE}/products`),
      ]);

      if (!catRes.ok) throw new Error("Failed to load categories");
      if (!prodRes.ok) throw new Error("Failed to load products");

      const cats = await catRes.json();
      const catList = Array.isArray(cats) ? cats : cats.categories ?? cats;
      category = catList.find((c) => c.slug === slug);

      const prodPayload = await prodRes.json();
      const prodList = prodPayload.products ?? prodPayload;

      // heuristic filtering: look for fields matching slug or category id
      products = prodList.filter((p) => {
        if (!p) return false;
        if (p.category === slug || p.categorySlug === slug) return true;
        if (p.categories && Array.isArray(p.categories) && p.categories.includes(slug)) return true;
        if (category && (p.category === category._id || p.categoryId === category._id)) return true;
        if (p.category && p.category.slug === slug) return true;
        return false;
      });
    } catch (err) {
      error = err?.message || String(err);
      console.error(err);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchCategoryAndProducts();
  });
</script>

<div class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  {#if loading}
    <div class="text-center py-12">Loading...</div>
  {:else if error}
    <div class="text-red-600 bg-red-50 p-4 rounded">{error}</div>
  {:else if !category}
    <div class="text-center py-12">
      <h2 class="text-2xl font-semibold">Category not found</h2>
      <a href="/categories" use:link class="text-indigo-600 mt-3 inline-block">Back to categories</a>
    </div>
  {:else}
    <div class="mb-8">
      <h1 class="text-3xl font-bold">{category.name}</h1>
      {#if category.description}
        <p class="mt-2 text-gray-600">{category.description}</p>
      {/if}
    </div>

    {#if products.length === 0}
      <div class="text-center py-12">
        <p class="text-gray-600">No products found for this category.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each products as p}
          <a href={`/products/${p._id ?? p.id}`} class="block">
            <div class="bg-white p-4 rounded shadow hover:shadow-md">
              {#if p.image}
                <img src={p.image} alt={p.name ?? p.title} class="w-full h-36 object-cover rounded mb-3" />
              {/if}
              <h3 class="font-semibold">{p.name ?? p.title}</h3>
              {#if p.price}
                <div class="text-indigo-600 font-bold mt-2">${p.price}</div>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>