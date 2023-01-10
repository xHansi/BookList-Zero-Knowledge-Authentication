import { userMemStore } from "./mem/user-mem-store.js";
import { booklistMemStore } from "./mem/booklist-mem-store.js";
import { bookMemStore } from "./mem/book-mem-store.js";
import { testUsers} from "../test-daten.js"

export const db = {
  userStore: null,
  booklistStore: null,
  bookStore: null,


  init() {
  
        this.userStore = userMemStore;
        this.booklistStore = booklistMemStore;
        this.bookStore = bookMemStore;

        //füllen der Test-User
        for (let i = 0; i < testUsers.length; i += 1) {
           this.userStore.addUser(testUsers[i]);
        }
      
  }
};