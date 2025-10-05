<script>
  import { link } from "svelte-spa-router";
</script>

<div class="bg-white">
  <div class="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
    <h2
      class="max-w-2xl text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl"
    >
      Ready to dive in now!
      <br />
      Explore our store.
    </h2>
    <div class="mt-10 flex items-center gap-x-6">
      <a
        use:link
        href="/products"
        class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Explore products</a
      >
      <a use:link href="/sign-up" class="text-sm/6 font-semibold text-gray-900"
        >Create account <span aria-hidden="true">→</span></a
      >
    </div>
  </div>
</div>
