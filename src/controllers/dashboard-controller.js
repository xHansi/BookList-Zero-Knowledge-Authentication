import { db } from "../models/db.js";
import { booklistJoiSchema } from "../models/joi-schemas.js";


export const dashboardController = {
  index: {
    handler: async function (request, h) {
      //Ohne Sessions wird allen angemeldeten Usern alle vorhanden Bücherliste angezeigt 
      //const booklists = await db.booklistStore.getAllBooklists();

      //Jetz wird nur User-/ID-Spezifische Bücherlisten den jeweiligen Nutzer angezeigt
      const loggedInUser = request.auth.credentials;
      const booklists = await db.booklistStore.getUserBooklists(loggedInUser._id);
      const viewData = {
        title: "Booklist Home",
        booklists: booklists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addBooklist: {
    validate: {
      payload: booklistJoiSchema,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Fehler bei dem hinzfügen einer Bücherliste", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newBookList = {
        //UserID wird zur Bücherliste hinzugefüt 
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.booklistStore.addBooklist(newBookList);
      return h.redirect("/dashboard");
    },
  },

  deleteBooklist: {
    handler: async function (request, h) {
      const booklist = await db.booklistStore.getBooklistById(request.params.id);
      await db.booklistStore.deleteBooklistById(booklist._id);
      return h.redirect("/dashboard");
    },
  },
};

