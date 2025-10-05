<script>
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</div>
