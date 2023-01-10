import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { userBeschreibung, JwtAuthentifizierung, anmeldungJoiSchema } from "../models/joi-schemas.js"
import { createToken } from "./jwt.js";



export const userApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("Fehler bei dem erstellen eines neuen Users");
      } catch (err) {
        return Boom.serverUnavailable("Fehler in der Datenbank");
      }
    },
    tags: ["api"],
    description: "Erstellt einen neuen User userAPI",
    notes: "Returnt den neu erstellten User",
    validate: { payload: userBeschreibung},
  },

  getAll: {
   auth: false,
    
    //JWT
    // auth: {
    //   strategy: "jwt",
    // },

    handler: async function(request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Fehler in der Datenbank");
      }
    },
    //Swager Dokumentation für die API-Methode 
    tags: ["api"],
    description: "getAll userApi",
    notes: "Returnt bei dem Aufruff alle User-Daten",
    
  },

  getOne: {
    //auth: false,

    //JWT
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("Kein User mit dieser ID in der Datenbak vorhanden");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("Kein User mit dieser ID in der Datenbak vorhanden");
      }
    },
    tags: ["api"],
    description: "getUser by ID userAPI",
    notes: "Returnt die User-Daten des Users mit der übergeben ID",
  },

  deleteAll: {
    //auth: false,

    //JWT
    auth: {
      strategy: "jwt",
    },

    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Fehler in der Datenbank");
      }
    },
    tags: ["api"],
    description: "deleteAll userApi",
    notes: "Löscht alle vorhanden User von BookList",
  },

  authentifizierungJWT: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User wurde nicht gefunden");
        } else if (user.password !== request.payload.password) {
          return Boom.unauthorized("Ungültiges Passwort");
        } else {
          const token = createToken(user);
          return h.response({ success: true, token: token }).code(201);
        }
      } catch (err) {
        return Boom.serverUnavailable("Fehler in der Datenbank");
      }
    },
    tags: ["api"],
    description: "Authentifizierung eines Users",
    notes: "Hat ein User eine gültige E-Mail mit dem passenden Passwort, wird ein JWT-Token erstellt und returnd",
    validate: { payload: anmeldungJoiSchema },
    response: { schema: JwtAuthentifizierung }
  },
};