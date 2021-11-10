import { Router } from "express";
import {
  logout,
  refreshToken,
  signin,
  signup,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/refresh-token", refreshToken);

router.delete("/logout", logout);

export default router;
