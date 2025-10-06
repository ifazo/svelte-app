import { writable } from "svelte/store";

const STORAGE_KEY = "ifaz-svelte-app";

const initialState = {
  user: null,
  products: [],
};

// ---- Load initial state from localStorage ----
function loadInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse stored state:", err);
  }
  return initialState;
}

// ---- Create store ----
export const store = writable(loadInitialState());

// ---- Persist store in localStorage ----
store.subscribe((value) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
});

// ---- User actions ----
export const addUser = (user) => {
  store.update((state) => ({ ...state, user }));
};

export const removeUser = () => {
  store.update((state) => ({ ...state, user: null }));
};

// ---- Product actions ----

/**
 * Add a new product to cart or increase its quantity if already exists
 */
export const addProduct = (product, quantity = 1) => {
  store.update((state) => {
    const existing = state.products.find((item) => item._id === product._id);
    let updatedProducts;

    if (existing) {
      updatedProducts = state.products.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedProducts = [...state.products, { ...product, quantity }];
    }

    return { ...state, products: updatedProducts };
  });
};

/**
 * Increase quantity of a product by 1 (or given amount)
 */
export const increaseProduct = (_id, amount = 1) => {
  store.update((state) => {
    const updatedProducts = state.products.map((item) =>
      item._id === _id
        ? { ...item, quantity: item.quantity + amount }
        : item
    );
    return { ...state, products: updatedProducts };
  });
};

/**
 * Decrease quantity of a product by 1 (or given amount)
 * Removes product if quantity goes to 0 or less
 */
export const decreaseProduct = (_id, amount = 1) => {
  store.update((state) => {
    const existing = state.products.find((item) => item._id === _id);
    if (!existing) return state;

    let updatedProducts;
    if (existing.quantity > amount) {
      updatedProducts = state.products.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity - amount }
          : item
      );
    } else {
      updatedProducts = state.products.filter((item) => item._id !== _id);
    }

    return { ...state, products: updatedProducts };
  });
};

/**
 * Remove a product entirely from cart
 */
export const deleteProduct = (_id) => {
  store.update((state) => {
    const updatedProducts = state.products.filter((item) => item._id !== _id);
    return { ...state, products: updatedProducts };
  });
};

// ---- Utility actions ----

export const clearProducts = () => {
  store.update((state) => ({ ...state, products: [] }));
};

export const clearStore = () => {
  store.set(initialState);
};
