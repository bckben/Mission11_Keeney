import { Book } from "../types/Book";

const API_URL =
  import.meta.env.PROD
    ? "https://mission13-bookstore-backend-ben.azurewebsites.net/Books"
    : "http://localhost:5006/Books";

export const getBooks = async () => {
  const res = await fetch(`${API_URL}`);
  return await res.json();
};

export const addBook = async (book: Book) => {
  await fetch(`${API_URL}/addbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
};

export const updateBook = async (id: number, book: Book) => {
  await fetch(`${API_URL}/updatebook/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
};

export const deleteBook = async (id: number) => {
  await fetch(`${API_URL}/deletebook/${id}`, {
    method: "DELETE",
  });
};
