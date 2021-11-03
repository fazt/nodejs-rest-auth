import { Router } from "express";
import createError from "http-errors";
import User from "../models/User";
import { authSchema } from "../helpers/validation_schema";
import { signAccessToken, signRefreshToken } from "../helpers/jwt_helpers";

const router = Router();

router.post("/signup", async (req, res, next) => {
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
});

router.post("/signin", async (req, res, next) => {
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
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refreshing a token");
});

router.post("/logout", async (req, res, next) => {
  res.send("logout");
});

export default router;
