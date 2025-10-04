<script>
  import { link } from 'svelte-spa-router'
  import logo from "../assets/svelte.svg";
  let menuOpen = false;
</script>

<header class="bg-white">
  <nav
    class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    aria-label="Global"
  >
    <!-- Left section -->
    <div class="flex flex-1">
      <!-- Desktop links -->
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="/" use:link class="text-sm/6 font-semibold text-gray-900">Home</a>
        <a href="/categories" use:link class="text-sm/6 font-semibold text-gray-900">Categories</a>
        <a href="/products" use:link class="text-sm/6 font-semibold text-gray-900">Products</a>
      </div>

      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <button
          type="button"
          on:click={() => (menuOpen = true)}
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span class="sr-only">Open main menu</span>
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Logo -->
    <a href="/" use:link class="-m-1.5 p-1.5">
      <span class="sr-only">Logo</span>
      <img class="h-8 w-auto" src={logo} alt="logo" />
    </a>

    <!-- Right section -->
    <div class="flex flex-1 justify-end">
      <a href="/login" use:link class="text-sm/6 font-semibold text-gray-900">
        Log in <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  </nav>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div
      class="lg:hidden fixed inset-0 z-50 bg-white"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 z-10 bg-black/10"
        on:click={() => (menuOpen = false)}
      ></div>

      <div
        class="fixed inset-y-0 left-0 z-20 w-full overflow-y-auto bg-white px-6 py-6"
      >
        <div class="flex items-center justify-between">
          <!-- Close button -->
          <button
            type="button"
            on:click={() => (menuOpen = false)}
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span class="sr-only">Close menu</span>
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

          <!-- Logo -->
          <a href="/" use:link class="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0">
            <span class="sr-only">Logo</span>
            <img class="h-8 w-auto" src={logo} alt="logo" />
          </a>

          <!-- Login link -->
          <div class="flex flex-1 justify-end">
            <a href="/login" use:link class="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        <div class="mt-6 space-y-2">
          <a
            href="/"
            use:link
            class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            on:click={() => (menuOpen = false)}
          >
            Home
          </a>
          <a
            href="/categories"
            use:link
            class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            on:click={() => (menuOpen = false)}
          >
            Categories
          </a>
          <a
            href="/products"
            use:link
            class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            on:click={() => (menuOpen = false)}
          >
            Products
          </a>
        </div>
      </div>
    </div>
  {/if}
</header>