import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/utils/api-response.js";
import { COOKIE_OPTIONS } from "../../common/constants/index.js";
import * as authService from "./auth.service.js";

// ── Register ──────────────────────────────────────────────────────────────────
export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(req.body);

  res
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .status(201)
    .json(new ApiResponse(201, { user, accessToken, refreshToken }, "Registration successful"));
});

// ── Login ─────────────────────────────────────────────────────────────────────
export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);

  res
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .status(200)
    .json(new ApiResponse(200, { user, accessToken, refreshToken }, "Login successful"));
});

// ── Logout ────────────────────────────────────────────────────────────────────
export const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.user._id);

  res
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

// ── Refresh Tokens ────────────────────────────────────────────────────────────
export const refresh = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
  const { user, accessToken, refreshToken } = await authService.refreshTokens(incomingToken);

  res
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .status(200)
    .json(new ApiResponse(200, { user, accessToken, refreshToken }, "Tokens refreshed"));
});
