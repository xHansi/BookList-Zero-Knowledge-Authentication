import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

//JWT-Token En-/Decoden in https://jwt.io/ 

const result = dotenv.config();

export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const options = {
    //Algorithmus für die Verschlüsselung
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.COOKIE_PASSWORT, options);
}

export function decodeToken(token) {
  const userDaten = {};
  try {
    const decoded = jwt.verify(token, process.env.COOKIE_PASSWORT);
    userDaten.userId = decoded.id;
    userDaten.email = decoded.email;
  } catch (e) {
    console.log(e.message);
  }
  return userDaten;
}

export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}