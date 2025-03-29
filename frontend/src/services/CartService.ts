export interface CartItem {
  bookID: number;
  title: string;
  price: number;
  quantity: number;
}

const CART_KEY = 'bookstore_cart';
const LAST_PAGE_KEY = 'lastPage';
const LAST_CATEGORY_KEY = 'lastCategory';

// --- CART FUNCTIONS ---

export function getCart(): CartItem[] {
  const cart = sessionStorage.getItem(CART_KEY);
  return cart ? (JSON.parse(cart) as CartItem[]) : [];
}

export function saveCart(cart: CartItem[]): void {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(book: Omit<CartItem, 'quantity'>): void {
  const cart = getCart();
  const existingItem = cart.find((item) => item.bookID === book.bookID);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  saveCart(cart);
}

export function clearCart(): void {
  sessionStorage.removeItem(CART_KEY);
}

// --- CONTINUE SHOPPING HELPERS ---

export function saveLastView(page: number, category: string): void {
  sessionStorage.setItem(LAST_PAGE_KEY, page.toString());
  sessionStorage.setItem(LAST_CATEGORY_KEY, category);
}

export function getLastView(): { page: number; category: string } {
  const page = parseInt(sessionStorage.getItem(LAST_PAGE_KEY) || '1');
  const category = sessionStorage.getItem(LAST_CATEGORY_KEY) || 'All';
  return { page, category };
}
