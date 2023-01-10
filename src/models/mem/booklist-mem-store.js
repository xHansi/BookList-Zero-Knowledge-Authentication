import { v4 } from "uuid";
import { bookMemStore } from "./book-mem-store.js";


let booklists = [];

export const booklistMemStore = {
  async getAllBooklists() {
    return booklists;
  },

  async addBooklist(booklist) {
    booklist._id = v4();
    booklists.push(booklist);
    return booklist;
  },

  async getBooklistById(id) {
    const list = booklists.find((booklist) => booklist._id === id);
    if (list) {
    list.books = await bookMemStore.getBooksByBooklistId(list._id);
    return list;
   }
    return null;
  },


  async deleteBooklistById(id) {
    const index = booklists.findIndex((booklist) => booklist._id === id);
    if (index !== -1) booklists.splice(index, 1);
  },

  async deleteAllbooklists() {
    booklists = [];
  },

  /*diese Methode gibt die Bücherlisten "booklists" zu der jweiligen user id wieder,
  sodass nicht mehr alle angemeldeten User auf alle Bücherlisten zugreifen kann*/

  async getUserBooklists(userid) {
    return booklists.filter((booklist) => booklist.userid === userid);
  },
};
