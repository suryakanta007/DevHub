import express from "express";
import multer from "multer";
import protect from "../../common/middleware/auth.middleware.js";
import * as userController from "./user.controller.js";
import * as followController from "../follow/follow.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ── Profile routes ─────────────────────────────────────────────────────────────
router.get("/search", userController.searchUsers);
router.get("/me", protect, userController.getMe);
router.patch("/me", protect, userController.updateProfile);
router.patch("/me/avatar", protect, upload.single("avatar"), userController.uploadAvatar);
router.patch("/me/banner", protect, upload.single("banner"), userController.uploadBanner);
router.get("/:username", userController.getByUsername);

// ── Follow routes ──────────────────────────────────────────────────────────────
router.post("/:id/follow", protect, followController.follow);
router.delete("/:id/follow", protect, followController.unfollow);
router.get("/:id/followers", followController.getFollowers);
router.get("/:id/following", followController.getFollowing);

export default router;
