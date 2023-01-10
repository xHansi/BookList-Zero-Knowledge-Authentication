import { userApi } from "./api/user-api.js";

//Swagger-Dokumentation: http://localhost:3000/documentation 

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create }, //http://localhost:3000/api/users in Postmann
  { method: "GET", path: "/api/users", config: userApi.getAll }, //http://localhost:3000/api/users
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll }, //http://localhost:3000/api/users
  { method: "GET", path: "/api/users/{id}", config: userApi.getOne }, //http://localhost:3000/api/users/{id}

  { method: "POST", path: "/api/users/authentifizieren", config: userApi.authentifizierungJWT },

];