import createError from "http-errors";
import User from "../models/User.js";
import { client } from "../helpers/init_redis.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt_helpers.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  // check if user already exists
  const user = await User.findOne({ email });
  if (user) throw new createError.Conflict(`${email} already exists`);

  const newUser = new User({ email, password });
  const savedUser = await newUser.save();

  const accessToken = await signAccessToken(savedUser.id);
  const refreshToken = await signRefreshToken(savedUser.id);

  res.json({ accessToken, refreshToken });
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  // check if user is not registered
  const user = await User.findOne({ email });
  if (!user) throw new createError.NotFound(`${email} is not register`);

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) throw new createError.Unauthorized("Invalid password");

  const accessToken = await signAccessToken(user.id);
  const refreshToken = await signRefreshToken(user.id);

  res.json({ accessToken, refreshToken });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) throw new createError.BadRequest("Invalid refresh token");

  const userId = await verifyRefreshToken(refreshToken);

  const accessToken = await signAccessToken(userId);
  const newRefreshToken = await signRefreshToken(userId);

  res.send({ accessToken, refreshToken: newRefreshToken });
};

export const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return next(new createError.BadRequest());

  const userId = await verifyRefreshToken(refreshToken);

  const result = await client.del(userId);
  console.log(result);

  return res.sendStatus(204);
};

export const profile = async (req, res, next) => {
  const user = await User.findById(req.userId).select("-password");
  return res.json(user);
};
