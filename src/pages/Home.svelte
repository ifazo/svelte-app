<script>
  import { store, clearCart } from '../stores/index.js';

  let user;
  let cartLength = 0;

  $: {
    $store;
    user = $store.user;
    cartLength = $store.cart.length;
  }

  function handleClearCart() {
    clearCart();
  }
</script>

<div class="text-center py-8">
  <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome Home</h1>
  <p class="text-lg text-gray-600 mb-2">This is the home page of your Svelte SPA.</p>

  {#if user}
    <p class="text-gray-700">
      Logged in as <strong>{user.email}</strong>
    </p>
  {:else}
    <p class="text-gray-500">No user logged in.</p>
  {/if}

  <p class="text-gray-700 mt-2">
    Cart items: <strong>{cartLength}</strong>
  </p>

  {#if cartLength > 0}
    <button
      on:click={handleClearCart}
      class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
    >
      Clear Cart
    </button>
  {/if}
</div>
