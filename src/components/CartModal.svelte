<script>
  import {
    store,
    increaseProduct,
    decreaseProduct,
    deleteProduct,
  } from "../stores/index.js";
  import { loadStripe } from "@stripe/stripe-js";
  import { createEventDispatcher } from "svelte";
  import toast from "svelte-french-toast";

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }

  let user = null;
  let products = [];
  let loading = false;

  $: {
    $store;
    user = $store.user || null;
    products = $store.products || [];
  }

  function increaseQuantity(productId) {
    increaseProduct(productId, 1);
  }

  function decreaseQuantity(productId) {
    decreaseProduct(productId, 1);
  }

  function removeProduct(productId) {
    const item = products.find((item) => item._id === productId);
    if (item) {
      deleteProduct(productId);
    }
  }


  async function handlePayment() {
    if (!user) {
      toast.error("Please log in to proceed with payment.");
      return;
    }

    if (products.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    loading = true;
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error("Stripe failed to load.");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
          name: user.displayName || "",
          email: user.email,
        }),
      });

      const session = await response.json();

      // @ts-ignore
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    } finally {
      loading = false;
    }
  }

  $: subtotal = products.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  $: shipping = subtotal > 0 ? 5.0 : 0;
  $: tax = subtotal * 0.08; // 8% tax
  $: total = subtotal + shipping + tax;
</script>

<div class="relative z-10" role="dialog" aria-modal="true">
  <div
    class="fixed inset-0 bg-gray-500/75 transition-opacity"
    aria-hidden="true"
    on:click={closeModal}
  ></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8"
    >
      <div
        class="flex w-full max-w-3xl transform text-left text-base transition sm:my-8"
      >
        <div
          class="relative flex w-full flex-col overflow-hidden bg-white pt-6 pb-8 sm:rounded-lg sm:pb-6 lg:py-8"
        >
          <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg font-medium text-gray-900">Shopping Cart</h2>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-500"
              on:click={closeModal}
            >
              <span class="sr-only">Close</span>
              <svg
                class="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" class="sr-only">
              Items in your shopping cart
            </h2>

            {#if products.length === 0}
              <div class="text-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="text-gray-500">Your cart is empty</div>
                <button
                  type="button"
                  class="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  on:click={closeModal}
                >
                  Continue Shopping
                </button>
              </div>
            {:else}
              <ul
                role="list"
                class="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8"
              >
                {#each products as product (product._id)}
                  <li class="flex py-8 text-sm sm:items-center">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      class="size-12 flex-none rounded-lg border border-gray-200 sm:size-16"
                    />
                    <div class="ml-4 flex-auto">
                      <h3 class="font-medium text-gray-900">{product.title}</h3>
                      <p class="mt-1 text-gray-500">
                        ${(product.price).toFixed(2)} each
                      </p>

                      <div class="mt-2 flex items-center gap-2">
                        <button
                          class="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          on:click={() => decreaseQuantity(product._id)}
                          disabled={product.quantity <= 1}>-</button
                        >

                        <span class="px-2 text-sm font-medium"
                          >{product.quantity}</span
                        >

                        <button
                          class="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          on:click={() => increaseQuantity(product._id)}>+</button
                        >
                      </div>
                    </div>

                    <div class="sm:w-1/3 sm:text-right">
                      <p class="font-medium text-gray-900 mb-2">
                        ${((product.price) * product.quantity).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        class="font-medium text-red-600 hover:text-red-500"
                        on:click={() => removeProduct(product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                {/each}
              </ul>
            {/if}
          </section>

          {#if products.length > 0}
            <section
              aria-labelledby="summary-heading"
              class="mt-auto sm:px-6 lg:px-8"
            >
              <div class="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                <h2 id="summary-heading" class="sr-only">Order summary</h2>

                <div class="flow-root">
                  <dl class="-my-4 divide-y divide-gray-200 text-sm">
                    <div class="flex items-center justify-between py-4">
                      <dt class="text-gray-600">Subtotal</dt>
                      <dd class="font-medium text-gray-900">
                        ${subtotal.toFixed(2)}
                      </dd>
                    </div>
                    <div class="flex items-center justify-between py-4">
                      <dt class="text-gray-600">Shipping</dt>
                      <dd class="font-medium text-gray-900">
                        ${shipping.toFixed(2)}
                      </dd>
                    </div>
                    <div class="flex items-center justify-between py-4">
                      <dt class="text-gray-600">Tax</dt>
                      <dd class="font-medium text-gray-900">
                        ${tax.toFixed(2)}
                      </dd>
                    </div>
                    <div class="flex items-center justify-between py-4">
                      <dt class="text-base font-medium text-gray-900">
                        Order total
                      </dt>
                      <dd class="text-base font-medium text-gray-900">
                        ${total.toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>

                {#if !user}
                  <div
                    class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md"
                  >
                    <p class="text-sm text-yellow-800">
                      Please <a href="/login" class="font-medium underline"
                        >login</a
                      > to continue with payment.
                    </p>
                  </div>
                {/if}
              </div>
            </section>

            <div class="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
              <button
                type="button"
                class="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                on:click={handlePayment}
                disabled={loading || !user || products.length === 0}
              >
                {#if loading}
                  Processing...
                {:else}
                  Pay Now ${total.toFixed(2)}
                {/if}
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
