<script>
  import logo from "../assets/svelte.svg";
  import { link } from "svelte-spa-router";
</script>

<header
  class="fixed bottom-2 left-2 right-2 z-50 md:sticky md:top-2 md:bottom-auto md:mx-2 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20 md:shadow-md"
>
  <nav
    class="mx-auto flex max-w-7xl items-center justify-between p-2 md:p-3 lg:px-4"
    aria-label="Global"
  >
    <div class="flex flex-1 justify-start">
      <a href="/" use:link class="-m-1.5 p-1.5">
        <span class="sr-only">Logo</span>
        <img class="h-8 w-auto" src={logo} alt="logo" />
      </a>
    </div>

    <div
      class="flex flex-1 justify-center gap-x-4 md:gap-x-8 lg:gap-x-12 text-xs md:text-sm font-semibold text-gray-900"
    >
      <a href="/" use:link class="hover:text-indigo-600">Home</a>
      <a href="/categories" use:link class="hover:text-indigo-600">Categories</a
      >
      <a href="/products" use:link class="hover:text-indigo-600">Products</a>
      <a href="/dashboard" use:link class="hover:text-indigo-600">Dashboard</a>
    </div>

    <div class="flex flex-1 items-center justify-end gap-x-2 md:gap-x-4">
      <a
        href="/login"
        use:link
        class="text-xs md:text-sm font-semibold text-gray-900 hover:text-indigo-600"
      >
        Log in
      </a>
      <button
        class="rounded-md bg-indigo-600 px-2.5 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Cart
      </button>
    </div>
  </nav>
</header>
