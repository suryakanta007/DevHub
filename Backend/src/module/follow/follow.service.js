import User from "../auth/auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import mongoose from "mongoose";

// ── Follow ────────────────────────────────────────────────────────────────────
export const follow = async (currentUserId, targetId) => {
  if (currentUserId.toString() === targetId.toString()) {
    throw ApiError.badRequest("You cannot follow yourself");
  }

  const targetUser = await User.findById(targetId);
  if (!targetUser) throw ApiError.notFound("User to follow not found");

  const currentUser = await User.findById(currentUserId);

  if (currentUser.following.includes(targetId)) {
    throw ApiError.badRequest("You are already following this user");
  }

  await Promise.all([
    User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetId } }),
    User.findByIdAndUpdate(targetId, { $addToSet: { followers: currentUserId } }),
  ]);

  return { followed: true };
};

// ── Unfollow ──────────────────────────────────────────────────────────────────
export const unfollow = async (currentUserId, targetId) => {
  if (currentUserId.toString() === targetId.toString()) {
    throw ApiError.badRequest("You cannot unfollow yourself");
  }

  await Promise.all([
    User.findByIdAndUpdate(currentUserId, { $pull: { following: targetId } }),
    User.findByIdAndUpdate(targetId, { $pull: { followers: currentUserId } }),
  ]);

  return { followed: false };
};

// ── Get Followers ─────────────────────────────────────────────────────────────
export const getFollowers = async (userId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const user = await User.findById(userId)
    .populate({
      path: "followers",
      select: "username fullName avatar bio",
      options: { skip, limit: +limit },
    })
    .lean();

  if (!user) throw ApiError.notFound("User not found");
  return { followers: user.followers, total: user.followers?.length ?? 0 };
};

// ── Get Following ─────────────────────────────────────────────────────────────
export const getFollowing = async (userId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const user = await User.findById(userId)
    .populate({
      path: "following",
      select: "username fullName avatar bio",
      options: { skip, limit: +limit },
    })
    .lean();

  if (!user) throw ApiError.notFound("User not found");
  return { following: user.following, total: user.following?.length ?? 0 };
};
