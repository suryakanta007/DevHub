import express from "express";
import validate from "../../common/middleware/validate.middleware.js";
import protect from "../../common/middleware/auth.middleware.js";
import * as authController from "./auth.controller.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import RefreshTokenDto from "./dto/refresh-token.dto.js";

const router = express.Router();

router.post("/register", validate(RegisterDto), authController.register);
router.post("/login", validate(LoginDto), authController.login);
router.post("/logout", protect, authController.logout);
router.post("/refresh", validate(RefreshTokenDto), authController.refresh);

export default router;
