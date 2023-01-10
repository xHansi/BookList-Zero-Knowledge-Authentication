import { v4 } from "uuid";

 let books = [];

 export const bookMemStore = {
  async getAllBooks() {
    return books;
  },

  async addBook(booklistId, book) {
    book._id = v4();
    book.booklistid = booklistId;
    books.push(book);
    return book;
  },

  async getBooksByBooklistId(id) {
    return books.filter((book) => book.booklistid === id);
  },

  async getBookById(id) {
    return books.find((book) => book._id === id);
  },

  async getBooklistBooks(booklistId) {
    return books.filter((book) => book.booklistid === booklistId);
    
  },

  async deleteBook(id) {
    const index = books.findIndex((book) => book._id === id);
    books.splice(index, 1);
  },

  async deleteAllBooks() {
    books = [];
  },

  async updateBook(book, updatedBook) {
    book.title = updatedBook.title;
    book.autor = updatedBook.autor;
    book.seitenanzahl = updatedBook.seitenanzahl;
  },
};
