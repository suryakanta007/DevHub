import { verifyAccessToken } from "../utils/jwt.js";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../../module/auth/auth.model.js";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw ApiError.unauthorized("Access token is required");
  }

  const decoded = verifyAccessToken(token);

  const user = await User.findById(decoded._id).select("-password -refreshToken");
  if (!user) {
    throw ApiError.unauthorized("User not found or token is invalid");
  }

  req.user = user;
  next();
});

export default protect;
