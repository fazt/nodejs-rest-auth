import { Router } from "express";
import createError from "http-errors";
import User from "../models/User";
import { authSchema } from "../helpers/validation_schema";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate email and password
    const result = await authSchema.validateAsync(req.body);

    // check if user already exists
    const user = await User.findOne({ email: result.email });

    if (user) throw new createError.Conflict(`${email} already exists`);

    const newUser = await User.create({ email, password });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  res.send("signin route");
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refreshing a token");
});

router.post("/logout", async (req, res, next) => {
  res.send("logout");
});

export default router;
