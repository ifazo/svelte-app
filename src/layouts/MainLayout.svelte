<script>
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-1 container mx-auto">
    <slot />
  </main>
  <Footer />
</div>
