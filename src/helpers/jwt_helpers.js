import jwt from "jsonwebtoken";
import createError from "http-errors";
import { JWT_SECRET } from "../config";

export const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      // name: "fazt",
      // iss: "fazt.dev",
      // aud: userId
    };

    const options = {
      expiresIn: "1d",
      issuer: "fazt.dev",
      audience: userId,
    };

    jwt.sign(payload, JWT_SECRET, options, (err, token) => {
      if (err) return reject(err);

      resolve(token);
    });
  });
};
