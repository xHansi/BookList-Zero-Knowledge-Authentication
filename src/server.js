import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import Cookie from "@hapi/cookie";
import { accountsController } from "./controllers/accounts-controller.js";
import dotenv from "dotenv";
import Joi from "joi";
import { apiRoutes } from "./api-routes.js";
import Inert from "@hapi/inert";
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { validate } from "./api/jwt.js"



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Init von HapiSwagger für API-Dokumentation 
const swaggerOptions = {
  info: {
    title: "BookList-API",
    version: "1.0",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  },
  security: [{ jwt: [] }]
};

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(Vision);

  //Authentifizierung mit Cookie
  await server.register(Cookie);

  //Validierungsschemen mit Joi
  server.validator(Joi);

  await server.register(Inert);

  //Swager                   http://localhost:3000/documentation
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  //JWT für Hapi zu Verschlüsselung der User-Daten
  await server.register(jwt);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  /*Mit dem .env Datei ist es möglich, sensible Informationen, Geheimnisse oder API-Details 
  in eine Textdatei zu auszulagern um somit die sensiblen Informationen nicht hart in den Code einzubinden.
   
  Prüfung ob die .env Datei richtig konfiguriert wurde */

  const dontevConfigStatus = dotenv.config();
  if (dontevConfigStatus.error) {
    console.log(dontevConfigStatus.error.message);
    process.exit(1);
  }

  /* Die Funktion "server.auth.strategy" konfiguriert eine Authentifizierungsstrategie für BookList - und legt die Strategie als Standard 
  für alle Routen fest. Sie definiert auch eine validate Funktion die eine Art Hook-Methode ist. Diese wird als Standard 
  für jede Route ausgelöst, um eine Überprüfung der Authentifizierung durchzuführen.*/

  //Authentifizierung ohne JWT
  server.auth.strategy("session", "cookie", {
    cookie: {

      //Diese sensbilen Informationen sind hier Hardcodiert und somit gefährdet 
      //name: "booklist",
      //password: "geheimespasswortdasniemandkennt!",

      //Bessere Lösung ist, die Infromationen und Schlüssel über die .env Datei abzufragen
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORT,

      //Verschlüsselt Ja/Nein
      isSecure: true,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
  
  //Authentifizierung mit JWT
  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORT,
    validate: validate,

    //Allorithmus für Verschlüsselung
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default("session");

  db.init();
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
