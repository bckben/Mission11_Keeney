import React, { useEffect, useState } from 'react';
import { addToCart, getCart } from '../services/CartService';
import { Link } from 'react-router-dom';

interface Book {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

interface BookApiResponse {
  books: Book[];
  totalPages: number;
}

const API_URL = import.meta.env.VITE_API_URL;

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Fetch paginated books
  useEffect(() => {
    fetch(`${API_URL}?pageNum=${page}&category=${category}`)
      .then((res) => res.json())
      .then((data: BookApiResponse) => {
        setBooks(data.books);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error('Error fetching books:', err));
  }, [page, category]);

  // Load categories
  useEffect(() => {
    fetch(`${API_URL}?pageNum=1`)
      .then((res) => res.json())
      .then((data: BookApiResponse) => {
        const uniqueCategories = Array.from(new Set(data.books.map((b) => b.category)));
        setCategories(['All', ...uniqueCategories]);
      })
      .catch((err) => console.error('Error loading categories:', err));
  }, []);

  // Load cart summary
  const updateCartSummary = () => {
    const cart = getCart();
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    setCartTotal(cart.reduce((sum, item) => sum + item.quantity * item.price, 0));
  };

  useEffect(() => {
    updateCartSummary();
  }, []);

  const handleAddToCart = (book: Book) => {
    addToCart({
      bookID: book.bookID,
      title: book.title,
      price: book.price,
    });
    alert(`${book.title} added to cart!`);
    updateCartSummary();
    sessionStorage.setItem('lastPage', window.location.pathname + window.location.search);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📚 Book List</h2>

        <div className="alert alert-primary mb-0">
          <Link to="/cart" className="text-decoration-none text-dark">
            🛒 Cart{' '}
            <span className="badge bg-success">{cartCount}</span> | ${cartTotal.toFixed(2)}
          </Link>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Filter by Category:</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="form-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th><th>ISBN</th>
            <th>Category</th><th>Pages</th><th>Price</th><th>Add</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification} / {book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleAddToCart(book)}
                >
                  🛒 Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default BookList;
