import jwt from "jsonwebtoken";
import createError from "http-errors";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import client from "./init_redis";

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
      expiresIn: "30s",
      issuer: "fazt.dev",
      audience: userId,
    };

    jwt.sign(payload, REFRESH_TOKEN_SECRET, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(new createError.InternalServerError());
      }
      // Store the token with id key and token value on redis
      client.set(userId, token, "EX", 30, (err, reply) => {
        if (err) {
          console.log(err.message);
          return reject(new createError.InternalServerError());
        }
        resolve(token);
      });
    });
  });
};

export const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // const message =
        //   err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        // return reject(new createError.Unauthorized(message));
        return reject(new createError.Unauthorized());
      }

      const userId = payload.aud;

      client.get(userId, (err, result) => {
        if (err) {
          console.log(err.message);
          return reject(new createError.InternalServerError());
        }

        if (result === refreshToken) return resolve(userId);

        reject(new createError.Unauthorized());
      });
    });
  });
};
