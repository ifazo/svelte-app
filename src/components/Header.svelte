<script>
  import logo from "../assets/svelte.svg";
  import { link, location } from "svelte-spa-router";
  import toast from "svelte-french-toast";
  import CartModal from "./CartModal.svelte";
  import { store, removeUser } from "../stores/index.js";
  import { signOut } from "../../firebase.config";
  import { Home, Layers, ShoppingBag, LayoutDashboard, LogOut, LogIn, ShoppingCart } from "lucide-svelte";

  
  let showCart = false;

  function openCart() {
    showCart = true;
  }

  function closeModal() {
    showCart = false;
  }
  
  const toggleCart = () => (showCart = !showCart);

  let user;
  $: {
    $store;
    user = $store.user;
  }

  function handleLogout() {
    signOut();
    removeUser();
    toast.success("Logged out successfully");
  }
</script>

<header
  class="fixed bottom-2 left-2 right-2 z-50 md:sticky md:top-2 md:bottom-auto md:mx-2 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20 md:shadow-md"
>
  <nav
    class="mx-auto flex max-w-7xl items-center justify-between p-2 md:p-3 lg:px-4"
    aria-label="Global"
  >
    <!-- Left: Logo -->
    <div class="flex flex-1 justify-start">
      <a href="/" use:link class="-m-1.5 p-1.5">
        <span class="sr-only">Logo</span>
        <img class="h-8 w-auto" src={logo} alt="logo" />
      </a>
    </div>

    <!-- Center: Navigation links -->
    <div
      class="flex flex-1 justify-center gap-x-4 md:gap-x-8 lg:gap-x-12 text-xs md:text-sm font-semibold"
    >
      <!-- Home -->
      <a
        href="/"
        use:link
        class="flex flex-col items-center md:flex-row md:gap-2 text-gray-900 hover:text-indigo-500 transition-colors"
        class:text-indigo-600={$location === "/"}
      >
        <Home class="w-5 h-5" />
        <span class="text-xs mt-1 md:mt-0 md:text-sm">Home</span>
      </a>

      <!-- Categories -->
      <a
        href="/categories"
        use:link
        class="flex flex-col items-center md:flex-row md:gap-2 text-gray-900 hover:text-indigo-500 transition-colors"
        class:text-indigo-600={$location.startsWith("/categories")}
      >
        <Layers class="w-5 h-5" />
        <span class="text-xs mt-1 md:mt-0 md:text-sm">Categories</span>
      </a>

      <!-- Products -->
      <a
        href="/products"
        use:link
        class="flex flex-col items-center md:flex-row md:gap-2 text-gray-900 hover:text-indigo-500 transition-colors"
        class:text-indigo-600={$location.startsWith("/products")}
      >
        <ShoppingBag class="w-5 h-5" />
        <span class="text-xs mt-1 md:mt-0 md:text-sm">Products</span>
      </a>

      <!-- Dashboard -->
      <a
        href="/dashboard"
        use:link
        class="flex flex-col items-center md:flex-row md:gap-2 text-gray-900 hover:text-indigo-500 transition-colors"
        class:text-indigo-600={$location.startsWith("/dashboard")}
      >
        <LayoutDashboard class="w-5 h-5" />
        <span class="text-xs mt-1 md:mt-0 md:text-sm">Dashboard</span>
      </a>
    </div>

    <!-- Right: Auth / Cart -->
    <div class="flex flex-1 items-center justify-end gap-x-2 md:gap-x-4">
      {#if user}
        <button
          on:click={handleLogout}
          class="flex flex-col items-center md:flex-row md:gap-2 text-xs md:text-sm font-semibold text-gray-900 hover:text-red-500 transition-colors"
        >
          <LogOut class="w-4 h-4" />
          <span class="text-xs mt-1 md:mt-0 md:text-sm">Logout</span>
        </button>
      {:else}
        <a
          href="/login"
          use:link
          class="flex flex-col items-center md:flex-row md:gap-2 text-xs md:text-sm font-semibold text-gray-900 hover:text-indigo-500 transition-colors"
          class:text-indigo-600={$location.startsWith("/login")}
        >
          <LogIn class="w-4 h-4" />
          <span class="text-xs mt-1 md:mt-0 md:text-sm">Login</span>
        </a>
      {/if}

      <button
        on:click={toggleCart}
        class="flex flex-col items-center md:flex-row md:gap-2 rounded-md bg-indigo-600 px-2.5 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <ShoppingCart class="w-4 h-4" />
        <span class="text-xs mt-1 md:mt-0 md:text-sm">Cart</span>
      </button>
    </div>
  </nav>
</header>

{#if showCart}
  <CartModal on:click={openCart} on:close={closeModal} />
{/if}
