import Joi from "joi";

export const regestrierungJoiSchema = Joi.object()
.keys({
    firstName: Joi.string().example("Harry").required(),
    lastName: Joi.string().example("Potter").required(),
    email: Joi.string().email().example("harry@potter.com").required(),

    password: Joi.string().example("GoldenerSchnatz").required(),
    //Für mindest Länge des Passwortes
    //password: Joi.string().min(10).example("Zauberstab10").required(),
  }).label("User Details");

  //Export des Joi-Schemas für die Swagger Dokumentation 
  export const userBeschreibung = Joi.array().items(regestrierungJoiSchema).label("User-Listen Details");

  export const anmeldungJoiSchema = Joi.object()
  .keys({
    email: Joi.string().email().example("ron@weasley.com").required(),
    password: Joi.string().example("SuperGeheimesPasswort").required(),
  }).label("User Anmeldedaten");
  
  export const buchJoiSchema = {
    title: Joi.string().required(),
    autor: Joi.string().required(),
    seitenanzahl: Joi.number().allow("").optional(),
  };
  
  export const booklistJoiSchema = {
    title: Joi.string().required(),
  };

  export const JwtAuthentifizierung = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwMDc4MDVkLWE4Y2MtNDgxZi04MjdhLTdkMjEyNzFhYmNiMyIsImVtYWlsIjoiaGFycnlAcG90dGVyLmNvbSIsImlhdCI6MTY2ODk4NzMxMCwiZXhwIjoxNjY4OTkwOTEwfQ.BsuRH841RmMTd8Tukwx772tINnjThyuWyG4vBQdhWVY").required(),
  }).label("Jwt-Authentifizierung");