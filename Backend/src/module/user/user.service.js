import User from "../auth/auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../../common/utils/cloudinary.js";
import { CLOUDINARY_FOLDERS } from "../../common/constants/index.js";

// ── Get own profile ───────────────────────────────────────────────────────────
export const getMe = async (userId) => {
  const user = await User.findById(userId)
    .populate("followers", "username fullName avatar")
    .populate("following", "username fullName avatar")
    .lean();
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

// ── Update profile ────────────────────────────────────────────────────────────
export const updateProfile = async (userId, updates) => {
  const allowed = ["fullName", "bio", "location", "skills", "socialLinks"];
  const filtered = {};

  for (const key of allowed) {
    if (updates[key] !== undefined) filtered[key] = updates[key];
  }

  const user = await User.findByIdAndUpdate(userId, filtered, {
    returnDocument: "after",
    runValidators: true,
  });
  return user;
};

// ── Upload avatar ─────────────────────────────────────────────────────────────
export const uploadAvatar = async (userId, buffer) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  // Delete old avatar from Cloudinary
  if (user.avatarPublicId) {
    await deleteFromCloudinary(user.avatarPublicId);
  }

  const { url, publicId } = await uploadToCloudinary(buffer, CLOUDINARY_FOLDERS.AVATARS);
  user.avatar = url;
  user.avatarPublicId = publicId;
  await user.save({ validateBeforeSave: false });

  return user;
};

// ── Upload banner ─────────────────────────────────────────────────────────────
export const uploadBanner = async (userId, buffer) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  if (user.bannerPublicId) {
    await deleteFromCloudinary(user.bannerPublicId);
  }

  const { url, publicId } = await uploadToCloudinary(buffer, CLOUDINARY_FOLDERS.BANNERS);
  user.banner = url;
  user.bannerPublicId = publicId;
  await user.save({ validateBeforeSave: false });

  return user;
};

// ── Get public profile ────────────────────────────────────────────────────────
export const getByUsername = async (username) => {
  const user = await User.findOne({ username })
    .populate("followers", "username fullName avatar")
    .populate("following", "username fullName avatar")
    .lean();
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

// ── Search users ──────────────────────────────────────────────────────────────
export const searchUsers = async ({ q, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .select("username fullName avatar bio skills")
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments({ $text: { $search: q } }),
  ]);

  return { users, total, page, limit, pages: Math.ceil(total / limit) };
};
