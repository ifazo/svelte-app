<script>
  import { onMount } from 'svelte';
  
  let categories = [];
  let loading = true;
  let error = null;

  async function fetchCategories() {
    try {
      loading = true;
      const response = await fetch('https://ifaz-svelte-server.vercel.app/api/categories');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      categories = await response.json();
      error = null;
    } catch (err) {
      error = err.message;
      console.error('Failed to fetch categories:', err);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchCategories();
  });
</script>

<div class="py-8">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-bold text-gray-900">Categories</h1>
    <button 
      on:click={fetchCategories}
      class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Refresh
    </button>
  </div>

  {#if loading}
    <div class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <span class="ml-3 text-gray-600">Loading categories...</span>
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
          <h3 class="text-sm font-medium text-red-800">Error loading categories</h3>
          <p class="mt-2 text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  {:else if categories.length === 0}
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-4 0H9m-4 0h4m4 0a2 2 0 012-2 2 2 0 012 2m-6 0a2 2 0 012-2 2 2 0 012 2m-6 0a2 2 0 012-2 2 2 0 012 2" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No categories</h3>
      <p class="mt-1 text-sm text-gray-500">No categories found.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each categories as category}
        <div class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 class="text-xl font-semibold mb-2">{category.name}</h2>
          <!-- <p class="text-gray-600 mb-4">{category.description || 'No description available'}</p> -->
          {#if category._id}
            <div class="text-xs text-gray-500">ID: {category._id}</div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>