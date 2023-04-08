import { db } from "../models/db.js";
import { regestrierungJoiSchema, anmeldungJoiSchema } from "../models/joi-schemas.js";
import  bcrypt  from "bcrypt";
import { zero_knowledge_proof } from "../zero-knowledge/zero_knowledge-generator.js";

//Hash-Bibliothek für Passwörter
//const bcrypt = require('bcrypt');

/*Für diese Fuktionen muss der Client nicht Authentifiziert sein um sie aufrufen zu können
Deswegen -> auth : false */

export const accountsController = {
  index: {
    auth : false,
    handler: function (request, h) {
      return h.view("main", { title: "Willkommen bei BookList" });
    },
  },
  showSignup: {
    auth : false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Regestriere dich für BookList" });
    },
  },
  signup: {
    auth : false,
    validate: {
      payload: regestrierungJoiSchema,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Fehler bei der Regestrierung", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;

       //Hashen des User-Passworts
       const salt = await bcrypt.genSalt();
      
       user.password_als_hashwert = await bcrypt.hash(user.password, salt);
       
      //Passwort in Zero-Knowledge-Key umwandeln und in DB speichern
      user.zero_knowledge_key = await zero_knowledge_proof.password_to_zero_knowledge_key(user.password);
    
      //User speichern
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth : false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Anmelden für BookList" });
    },
  },
  login: {
    auth : false,
    validate: {
      payload: anmeldungJoiSchema,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Fehler bei der Anmeldung", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);

      if(!user){
        return h.redirect("/");
      }

      const passwordMatch = await bcrypt.compare(password, user.password_als_hashwert)
      
      if (!user || !passwordMatch /*user.password !== password_als_klartext*/) {
        return h.redirect("/");
      }
      //Verifizierter User erhält den Cookie und ist somit Autorisiert auf die hinterlegten Daten des Accounts zuzugreifen
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    auth : false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  //Session zuweißung für den jeweiligen User
  /*Die Funktion hat Zugriff auf ein Seesionobjekt, das die ID des Benutzers enthält. 
  Diese ID wird verwendet, um das Benutzerobjekt im Speicher zu finden, und gibt dieses Objekt zurück, 
  wenn es gefunden wurde. Anderfalls wird der Request nicht Validiert */
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },

  showZeroKnowledgeLogin: {
    auth : false,
    handler: function (request, h) {
      return h.view("zero_knowledge_login-view", { title: "Anmelden für BookList" });
    },
  },

  zeroKnowledgeLogin: {
    auth : false,
    validate: {
      payload: anmeldungJoiSchema,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("zero_knowledge_login-view", { title: "Fehler bei der Anmeldung", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);

      if(!user){
        return h.redirect("/");
      }

      //Check ob das Passswort die den Zero-Knowledge-Key lösen kann
      const passwordMatch = await zero_knowledge_proof.check_zero_knowledge_key(password, user.zero_knowledge_key);

      if (!user || !passwordMatch) {
        return h.redirect("/");
      }
      //Verifizierter User erhält den Cookie und ist somit Authentifizierft auf die Daten des User zuzugreifen
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
};