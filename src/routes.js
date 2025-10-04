import Home from './pages/Home.svelte'
import Categories from './pages/Categories.svelte'
import Products from './pages/Products.svelte'
import Login from './pages/Login.svelte'

const routes = {
  '/': Home,
  '/categories': Categories,
  '/products': Products,
  '/login': Login,
}

export default routes