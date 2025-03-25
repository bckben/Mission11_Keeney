import React, { useEffect, useState } from 'react';

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

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5006/Books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  const sortedBooks = [...books].sort((a, b) =>
    sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );

  const paginatedBooks = sortedBooks.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(books.length / perPage);

  return (
    <div className="container mt-4">
      <h2>📚 Book List</h2>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <label className="me-2">Results per page:</label>
          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="form-select d-inline w-auto"
          >
            {[5, 10, 15].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setSortAsc(!sortAsc)}
        >
          Sort by Title {sortAsc ? '⬆️' : '⬇️'}
        </button>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th><th>ISBN</th>
            <th>Category</th><th>Pages</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.map((book) => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification} / {book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
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
