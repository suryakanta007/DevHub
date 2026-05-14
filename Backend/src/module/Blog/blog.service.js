import Blog from "./blog.model.js";
import User from "../auth/auth.model.js";
import ApiError from "../../common/utils/api-error.js";

// ── Create (draft by default) ──────────────────────────────────────────────────
export const createBlog = async (userId, data) => {
  const blog = await Blog.create({ ...data, author: userId });
  return blog.populate("author", "username fullName avatar");
};

// ── Publish ───────────────────────────────────────────────────────────────────
export const publishBlog = async (blogId, userId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw ApiError.notFound("Blog not found");
  if (blog.author.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not the author of this blog");
  }

  blog.isPublished = true;
  await blog.save();
  return blog;
};

// ── List published blogs (paginated + filtered) ────────────────────────────────
export const listBlogs = async ({ q, category, sort = "latest", page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const filter = { isPublished: true };

  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;

  const sortOption = sort === "trending" ? { "likes.length": -1 } : { createdAt: -1 };

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(+limit)
      .populate("author", "username fullName avatar")
      .lean(),
    Blog.countDocuments(filter),
  ]);

  return { blogs, total, page: +page, limit: +limit, pages: Math.ceil(total / limit) };
};

// ── Get single ────────────────────────────────────────────────────────────────
export const getBlog = async (id) => {
  const blog = await Blog.findById(id).populate("author", "username fullName avatar");
  if (!blog) throw ApiError.notFound("Blog not found");
  return blog;
};

// ── Update (author only) ───────────────────────────────────────────────────────
export const updateBlog = async (id, userId, updates) => {
  const blog = await Blog.findById(id);
  if (!blog) throw ApiError.notFound("Blog not found");
  if (blog.author.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not the author of this blog");
  }

  Object.assign(blog, updates);
  await blog.save();
  return blog;
};

// ── Delete (author only) ───────────────────────────────────────────────────────
export const deleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw ApiError.notFound("Blog not found");
  if (blog.author.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not the author of this blog");
  }

  await blog.deleteOne();
  return { deleted: true };
};

// ── Like toggle ───────────────────────────────────────────────────────────────
export const toggleLike = async (blogId, userId) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw ApiError.notFound("Blog not found");

  const alreadyLiked = blog.likes.includes(userId);
  const update = alreadyLiked
    ? { $pull: { likes: userId } }
    : { $addToSet: { likes: userId } };

  const updated = await Blog.findByIdAndUpdate(blogId, update, { new: true });
  return { liked: !alreadyLiked, count: updated.likes.length };
};

// ── Save toggle ───────────────────────────────────────────────────────────────
export const toggleSave = async (blogId, userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  const alreadySaved = user.savedBlogs.includes(blogId);
  const update = alreadySaved
    ? { $pull: { savedBlogs: blogId } }
    : { $addToSet: { savedBlogs: blogId } };

  await User.findByIdAndUpdate(userId, update);
  return { saved: !alreadySaved };
};
