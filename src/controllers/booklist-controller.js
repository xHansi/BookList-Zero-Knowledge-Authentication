import { db } from "../models/db.js";
import { buchJoiSchema } from "../models/joi-schemas.js";

export const booklistController = {
  index: {
    handler: async function (request, h) {
      const booklist = await db.booklistStore.getBooklistById(request.params.id);
      const viewData = {
        title: "Booklist",
        booklist: booklist,
      };
      return h.view("booklist-view", viewData);
    },
  },

  addBook: {
    validate: {
      payload: buchJoiSchema,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("booklist-view", { title: "Fehler bei dem hinzufügen eines Buchs", errors: error.details }).takeover().code(400);
      },
    },
    
    handler: async function (request, h) {
      const booklist = await db.booklistStore.getBooklistById(request.params.id);
      const newBook= {
        title: request.payload.title,
        autor: request.payload.autor,
        seitenanzahl: Number(request.payload.seitenanzahl),
      };
      await db.bookStore.addBook(booklist._id, newBook);
      return h.redirect(`/booklist/${booklist._id}`);
    },
  },

  deleteBook: {
    handler: async function(request, h) {
      const booklist = await db.booklistStore.getBooklistById(request.params.id);
      await db.bookStore.deleteBook(request.params.trackid);
      return h.redirect(`/booklist/${booklist._id}`);
    },
  },
};