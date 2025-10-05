import { writable } from 'svelte/store';

const STORAGE_KEY = 'ifaz-svelte-app';

const initialState = {
  user: null,
  cart: []
};

function loadInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error('Failed to parse stored state:', err);
  }
  return initialState;
}

export const store = writable(loadInitialState());

store.subscribe((value) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save state:', err);
  }
});

export const addUser = (user) => {
  store.update(state => ({ ...state, user }));
};

export const removeUser = () => {
  store.update(state => ({ ...state, user: null }));
};

export const addProductById = (_id, quantity = 1) => {
  store.update(state => {
    const existing = state.cart.find(item => item._id === _id);
    let updatedCart;

    if (existing) {
      updatedCart = state.cart.map(item =>
        item._id === _id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...state.cart, { _id, quantity }];
    }

    return { ...state, cart: updatedCart };
  });
};

export const removeProductById = (_id) => {
  store.update(state => ({
    ...state,
    cart: state.cart.filter(item => item._id !== _id)
  }));
};

export const clearCart = () => {
  store.update(state => ({ ...state, cart: [] }));
};

export const clearStore = () => {
  store.set(initialState);
};
