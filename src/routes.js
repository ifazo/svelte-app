import Home from './pages/Home.svelte'
import Categories from './pages/Categories.svelte'
import Products from './pages/Products.svelte'
import Login from './pages/Login.svelte'
import SignUp from './pages/SignUp.svelte'
import NotFound from './pages/NotFound.svelte'
import Category from './pages/Category.svelte'
import Product from './pages/Product.svelte'

const routes = {
  '/': Home,
  '/categories': Categories,
  '/categories/:slug': Category,
  '/products': Products,
  '/products/:id': Product,
  '/login': Login,
  '/sign-up': SignUp,
  '*': NotFound,
}

export default routes