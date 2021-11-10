import client from "../helpers/init_redis";
import createError from "http-errors";
import User from "../models/User";
import { authSchema } from "../helpers/validation_schema";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helpers";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate email and password
    const result = await authSchema.validateAsync(req.body);

    // check if user already exists
    const user = await User.findOne({ email: result.email });

    if (user) throw new createError.Conflict(`${email} already exists`);

    const newUser = new User({ email, password });

    const savedUser = await newUser.save();

    const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    // validate email and password
    const result = await authSchema.validateAsync(req.body);

    // check if user is not registered
    const user = await User.findOne({ email: result.email });

    if (!user)
      throw new createError.NotFound(`${result.email} is not register`);

    const isValidPassword = await user.comparePassword(result.password);

    if (!isValidPassword)
      throw new createError.Unauthorized("Invalid password");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi)
      return next(new createError.BadRequest("Invalid username or password"));
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      throw new createError.BadRequest("Invalid refresh token");

    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);

    res.send({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) return next(new createError.BadRequest());

    const userId = await verifyRefreshToken(refreshToken);

    client.DEL(userId, (err, result) => {
      if (err) {
        console.log(err.message);
        return next(new createError.InternalServerError());
      }

      console.log(result);

      res.sendStatus(204);
    });
  } catch (error) {
    next(error);
  }
};
