import jwt from "jsonwebtoken";
import createError from "http-errors";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";

export const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};

    const options = {
      expiresIn: "20s",
      issuer: "fazt.dev",
      audience: userId,
    };

    jwt.sign(payload, ACCESS_TOKEN_SECRET, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(new createError.InternalServerError());
      }

      resolve(token);
    });
  });
};

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"])
    return next(new createError.Unauthorized());

  const authHeader = req.headers["authorization"];

  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(new createError.Unauthorized(message));
    }

    req.userId = payload.aud;
    next();
  });
};

export const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};

    const options = {
      expiresIn: "1y",
      issuer: "fazt.dev",
      audience: userId,
    };

    jwt.sign(payload, REFRESH_TOKEN_SECRET, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(new createError.InternalServerError());
      }

      resolve(token);
    });
  });
}
