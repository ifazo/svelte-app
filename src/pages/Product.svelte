<script>
  import { onMount } from "svelte";
  import { addProductById } from "../stores/index.js";

  let { params } = $props();
  const id = params.id;

  let loading = $state(true);
  let error = $state(null);
  let product = $state(null);
  let selectedImage = $state(0);
  let quantity = $state(1);
  let isWishlisted = $state(false);
  let showComments = $state(false);

  async function fetchProduct() {
    loading = true;
    error = null;
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/products/${id}`);
      product = await res.json();
      if (!product) throw new Error("Product not found");
    } catch (err) {
      error = err?.message || String(err);
      console.error(err);
    } finally {
      loading = false;
    }
  }

  function handleAddToCart() {
    if (product) {
      addProductById(product._id || product.id, quantity);
      console.log("[v0] Added to cart:", product.title, "Quantity:", quantity);
    }
  }

  function handleBuyNow() {
    if (product) {
      addProductById(product._id || product.id, quantity);
      console.log("[v0] Buy now clicked:", product.title);
      // Navigate to checkout
    }
  }

  function toggleWishlist() {
    isWishlisted = !isWishlisted;
    console.log("[v0] Wishlist toggled:", isWishlisted);
  }

  function calculateDiscountedPrice(price, discount) {
    return (price - (price * discount) / 100).toFixed(2);
  }

  onMount(() => {
    fetchProduct();
  });
</script>

<div class="bg-white min-h-screen">
   <!-- Breadcrumb  -->
  <nav class="border-b border-border">
    <div class="container mx-auto px-4 py-4">
      <ol class="flex items-center gap-2 text-sm text-muted-foreground">
        <li><a href="/" class="hover:text-foreground transition-colors">Home</a></li>
        <li>/</li>
        {#if loading}
          <div class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
        <span class="ml-3 text-gray-600 dark:text-gray-300"
          >Loading categories...</span
        >
      </div>
        {:else if product}
          <li><a href={`/category/${product.category}`} class="hover:text-foreground transition-colors capitalize">{product.category}</a></li>
          <li>/</li>
          <li class="text-foreground font-medium">{product.title}</li>
        {/if}
      </ol>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-8 md:py-16">
    {#if loading}
       <!-- Loading Skeleton  -->
      <div class="grid md:grid-cols-2 gap-8 md:gap-16">
         <!-- Image Skeleton  -->
        <div class="space-y-4">
          <div class="aspect-square bg-muted animate-pulse rounded-lg"></div>
          <div class="grid grid-cols-4 gap-4">
            {#each Array(4) as _}
              <div class="aspect-square bg-muted animate-pulse rounded-lg"></div>
            {/each}
          </div>
        </div>

         <!-- Details Skeleton  -->
        <div class="space-y-6">
          <div class="h-12 bg-muted animate-pulse rounded w-3/4"></div>
          <div class="h-6 bg-muted animate-pulse rounded w-1/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-muted animate-pulse rounded"></div>
            <div class="h-4 bg-muted animate-pulse rounded w-5/6"></div>
          </div>
          <div class="h-16 bg-muted animate-pulse rounded"></div>
          <div class="flex gap-4">
            <div class="h-12 bg-muted animate-pulse rounded flex-1"></div>
            <div class="h-12 bg-muted animate-pulse rounded flex-1"></div>
          </div>
        </div>
      </div>
    {:else if error}
      <div class="text-center py-16">
        <p class="text-destructive text-lg">Error: {error}</p>
      </div>
    {:else if product}
      <div class="grid md:grid-cols-2 gap-8 md:gap-16">
         <!-- Image Gallery  -->
        <div class="space-y-4">
          <div class="aspect-square bg-card rounded-lg overflow-hidden border border-border">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.title}
              class="w-full h-full object-contain"
            />
          </div>
          <div class="grid grid-cols-4 gap-4">
            {#each product.images as image, index}
              <button
                onclick={() => selectedImage = index}
                class="aspect-square bg-card rounded-lg overflow-hidden border-2 transition-all hover:border-accent {selectedImage === index ? 'border-accent' : 'border-border'}"
              >
                <img src={image || "/placeholder.svg"} alt={`${product.title} ${index + 1}`} class="w-full h-full object-contain" />
              </button>
            {/each}
          </div>
        </div>

         <!-- Product Details  -->
        <div class="space-y-6">
           Title & Brand 
          <div>
            <p class="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.brand}</p>
            <h1 class="font-serif text-4xl md:text-5xl text-balance leading-tight">{product.title}</h1>
          </div>

           <!-- Rating & Stock  -->
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <div class="flex">
                {#each Array(5) as _, i}
                  <svg class="w-5 h-5 {i < Math.floor(product.rating) ? 'text-accent' : 'text-muted'}" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/each}
              </div>
              <span class="text-sm text-muted-foreground">{product.rating}</span>
            </div>
            <div class="h-4 w-px bg-border"></div>
            <div class="text-sm">
              <span class="text-accent font-medium">{product.stock} in stock</span>
            </div>
          </div>

           <!-- Price  -->
          <div class="flex items-baseline gap-3">
            <span class="text-4xl font-serif text-accent">${calculateDiscountedPrice(product.price, product.discountPercentage)}</span>
            {#if product.discountPercentage > 0}
              <span class="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              <span class="text-sm bg-accent/20 text-accent px-2 py-1 rounded">-{product.discountPercentage}%</span>
            {/if}
          </div>

           <!-- Description  -->
          <p class="text-muted-foreground leading-relaxed">{product.description}</p>

           <!-- Product Info  -->
          <div class="grid grid-cols-2 gap-4 py-6 border-y border-border">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Category</p>
              <p class="capitalize font-medium">{product.category}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">SKU</p>
              <p class="font-medium">{product.sku}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Availability</p>
              <p class="font-medium">{product.availabilityStatus}</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground mb-1">Shipping</p>
              <p class="font-medium">{product.shippingInformation}</p>
            </div>
          </div>

           <!-- Quantity Selector  -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-muted-foreground">Quantity</span>
            <div class="flex items-center border border-border rounded-lg">
              <button
                onclick={() => quantity = Math.max(1, quantity - 1)}
                class="px-4 py-2 hover:bg-muted transition-colors"
              >
                -
              </button>
              <span class="px-6 py-2 border-x border-border">{quantity}</span>
              <button
                onclick={() => quantity = Math.min(product.stock, quantity + 1)}
                class="px-4 py-2 hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>
          </div>

           <!-- Action Buttons  -->
          <div class="flex gap-4">
            <button
              onclick={handleAddToCart}
              class="flex-1 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Add to Cart
            </button>
            <button
              onclick={handleBuyNow}
              class="flex-1 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Buy Now
            </button>
            <button
              onclick={toggleWishlist}
              class="px-4 py-4 border border-border rounded-lg hover:bg-muted transition-colors"
              aria-label="Add to wishlist"
            >
              <svg class="w-6 h-6 {isWishlisted ? 'fill-accent text-accent' : 'text-muted-foreground'}" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

           <!-- Additional Info  -->
          <div class="space-y-2 text-sm text-muted-foreground pt-4">
            <p>• {product.warrantyInformation}</p>
            <p>• {product.returnPolicy}</p>
            <p>• Minimum order quantity: {product.minimumOrderQuantity}</p>
          </div>
        </div>
      </div>

       <!-- Reviews Section  -->
      <div class="mt-16 md:mt-24">
        <div class="flex items-center justify-between mb-8">
          <h2 class="font-serif text-3xl md:text-4xl">Customer Reviews</h2>
          <button
            onclick={() => showComments = !showComments}
            class="text-sm text-accent hover:text-accent/80 transition-colors"
          >
            {showComments ? 'Hide' : 'Show'} Reviews
          </button>
        </div>

        {#if showComments}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each product.reviews as review}
              <div class="bg-card border border-border rounded-lg p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex">
                    {#each Array(5) as _, i}
                      <svg class="w-4 h-4 {i < review.rating ? 'text-accent' : 'text-muted'}" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    {/each}
                  </div>
                  <span class="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p class="text-foreground leading-relaxed">{review.comment}</p>
                <div class="pt-2 border-t border-border">
                  <p class="text-sm font-medium">{review.reviewerName}</p>
                  <p class="text-xs text-muted-foreground">{review.reviewerEmail}</p>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>
