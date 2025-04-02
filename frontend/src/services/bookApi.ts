import { Book } from "../types/Book";

const API_URL = "https://mission13-bookstore-backend-ben.azurewebsites.net/Books";

export const getBooks = async (pageNum = 1, category = "All") => {
  const res = await fetch(`${API_URL}/GetAllBooks?pageNum=${pageNum}&category=${category}`);
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
