import User from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../common/utils/jwt.js";

/**
 * Generate both tokens for a user and store the refresh token in DB.
 */
const generateTokens = async (user) => {
  const payload = { _id: user._id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ── Register ──────────────────────────────────────────────────────────────────
export const register = async ({ username, fullName, email, password }) => {
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    const field = existing.email === email ? "email" : "username";
    throw ApiError.conflict(`A user with this ${field} already exists`);
  }

  const user = await User.create({ username, fullName, email, password });
  const { accessToken, refreshToken } = await generateTokens(user);

  return { user, accessToken, refreshToken };
};

// ── Login ─────────────────────────────────────────────────────────────────────
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  const { accessToken, refreshToken } = await generateTokens(user);

  return { user, accessToken, refreshToken };
};

// ── Logout ────────────────────────────────────────────────────────────────────
export const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// ── Refresh Tokens ────────────────────────────────────────────────────────────
export const refreshTokens = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) throw ApiError.unauthorized("Refresh token is required");

  const decoded = verifyRefreshToken(incomingRefreshToken);

  const user = await User.findById(decoded._id);
  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw ApiError.unauthorized("Refresh token is invalid or expired");
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  return { user, accessToken, refreshToken };
};
