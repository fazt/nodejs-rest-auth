import Router from "express-promise-router";
import {
  logout,
  refreshToken,
  signin,
  signup,
  profile,
} from "../controllers/auth.controller.js";
import { verifyAccessToken } from "../helpers/jwt_helpers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signupSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/signin", signin);

router.post("/refresh-token", refreshToken);

router.delete("/logout", logout);

router.get("/profile", verifyAccessToken, profile);

export default router;
