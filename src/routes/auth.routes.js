import { Router } from "express";
import createError from "http-errors";
import User from "../models/User";

const router = Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate email and password
    if (!email || !password)
      throw new createError.BadRequest("Email and password are required");

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) throw new createError.Conflict(`${email} already exists`);

    const newUser = await User.create({ email, password });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
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
