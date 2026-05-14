import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/utils/api-response.js";
import ApiError from "../../common/utils/api-error.js";
import * as userService from "./user.service.js";

// ── GET /users/me ─────────────────────────────────────────────────────────────
export const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user._id);
  res.status(200).json(new ApiResponse(200, user, "Profile fetched"));
});

// ── PATCH /users/me ───────────────────────────────────────────────────────────
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, user, "Profile updated"));
});

// ── PATCH /users/me/avatar ────────────────────────────────────────────────────
export const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest("Avatar file is required");
  const user = await userService.uploadAvatar(req.user._id, req.file.buffer);
  res.status(200).json(new ApiResponse(200, user, "Avatar updated"));
});

// ── PATCH /users/me/banner ────────────────────────────────────────────────────
export const uploadBanner = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest("Banner file is required");
  const user = await userService.uploadBanner(req.user._id, req.file.buffer);
  res.status(200).json(new ApiResponse(200, user, "Banner updated"));
});

// ── GET /users/:username ──────────────────────────────────────────────────────
export const getByUsername = asyncHandler(async (req, res) => {
  const user = await userService.getByUsername(req.params.username);
  res.status(200).json(new ApiResponse(200, user, "User profile fetched"));
});

// ── GET /users/search?q= ──────────────────────────────────────────────────────
export const searchUsers = asyncHandler(async (req, res) => {
  const { q, page, limit } = req.query;
  const result = await userService.searchUsers({ q, page: +page, limit: +limit });
  res.status(200).json(new ApiResponse(200, result, "Users found"));
});
