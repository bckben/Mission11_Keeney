import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { getBooks, addBook, updateBook, deleteBook } from "../services/bookApi";

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [newBook, setNewBook] = useState<Book>({
    bookID: 0,
    title: "",
    author: "",
    category: "",
    price: 0,
    publisher: "",
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const result = await getBooks();
    setBooks(result.books);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleAddBook = async () => {
    await addBook(newBook);
    setNewBook({ bookID: 0, title: "", author: "", category: "", price: 0, publisher: "" });
    loadBooks();
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
  };

  const handleUpdateBook = async () => {
    if (editingBook) {
      await updateBook(editingBook.bookID, editingBook);
      setEditingBook(null);
      loadBooks();
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await deleteBook(id);
      loadBooks();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">📚 Admin Book Manager</h2>

      {/* Add Book Form */}
      <div className="mb-6">
        <h3 className="font-bold">Add Book</h3>
        <input name="title" placeholder="Title" value={newBook.title} onChange={handleInputChange} className="border p-1 m-1" />
        <input name="author" placeholder="Author" value={newBook.author} onChange={handleInputChange} className="border p-1 m-1" />
        <input name="category" placeholder="Category" value={newBook.category} onChange={handleInputChange} className="border p-1 m-1" />
        <input name="price" placeholder="Price" value={newBook.price} onChange={handleInputChange} className="border p-1 m-1" />
        <input name="publisher" placeholder="Publisher" value={newBook.publisher} onChange={handleInputChange} className="border p-1 m-1" />
        <button onClick={handleAddBook} className="bg-green-500 text-white px-3 py-1 rounded">Add Book</button>
      </div>

      {/* Book Table */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th>Title</th><th>Author</th><th>Category</th><th>Price</th><th>Publisher</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID} className="border-t">
              <td>{editingBook?.bookID === book.bookID ? <input name="title" value={editingBook.title} onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })} /> : book.title}</td>
              <td>{editingBook?.bookID === book.bookID ? <input name="author" value={editingBook.author} onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })} /> : book.author}</td>
              <td>{editingBook?.bookID === book.bookID ? <input name="category" value={editingBook.category} onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })} /> : book.category}</td>
              <td>{editingBook?.bookID === book.bookID ? <input name="price" value={editingBook.price} onChange={(e) => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) })} /> : `$${book.price.toFixed(2)}`}</td>
              <td>{editingBook?.bookID === book.bookID ? <input name="publisher" value={editingBook.publisher} onChange={(e) => setEditingBook({ ...editingBook, publisher: e.target.value })} /> : book.publisher}</td>
              <td>
                {editingBook?.bookID === book.bookID ? (
                  <button onClick={handleUpdateBook} className="bg-blue-500 text-white px-2 py-1 rounded">Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(book)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                    <button onClick={() => handleDeleteBook(book.bookID)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooks;
