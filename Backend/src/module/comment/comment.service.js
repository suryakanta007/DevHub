import Comment from "./comment.model.js";
import Project from "../Project/project.model.js";
import Blog from "../Blog/blog.model.js";
import ApiError from "../../common/utils/api-error.js";

// ── Add comment to project ─────────────────────────────────────────────────────
export const addProjectComment = async (projectId, userId, text) => {
  const project = await Project.findById(projectId);
  if (!project) throw ApiError.notFound("Project not found");

  const comment = await Comment.create({ text, user: userId, projectId });
  await Project.findByIdAndUpdate(projectId, { $inc: { commentsCount: 1 } });

  return comment.populate("user", "username fullName avatar");
};

// ── Add comment to blog ────────────────────────────────────────────────────────
export const addBlogComment = async (blogId, userId, text) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw ApiError.notFound("Blog not found");

  const comment = await Comment.create({ text, user: userId, blogId });
  await Blog.findByIdAndUpdate(blogId, { $inc: { commentsCount: 1 } });

  return comment.populate("user", "username fullName avatar");
};

// ── Get project comments ──────────────────────────────────────────────────────
export const getProjectComments = async (projectId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [comments, total] = await Promise.all([
    Comment.find({ projectId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(+limit)
      .populate("user", "username fullName avatar")
      .lean(),
    Comment.countDocuments({ projectId }),
  ]);

  return { comments, total, page: +page, limit: +limit };
};

// ── Get blog comments ──────────────────────────────────────────────────────────
export const getBlogComments = async (blogId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const [comments, total] = await Promise.all([
    Comment.find({ blogId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(+limit)
      .populate("user", "username fullName avatar")
      .lean(),
    Comment.countDocuments({ blogId }),
  ]);

  return { comments, total, page: +page, limit: +limit };
};

// ── Delete comment (own only) ─────────────────────────────────────────────────
export const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw ApiError.notFound("Comment not found");
  if (comment.user.toString() !== userId.toString()) {
    throw ApiError.forbidden("You can only delete your own comments");
  }

  // Decrement count on parent
  if (comment.projectId) {
    await Project.findByIdAndUpdate(comment.projectId, { $inc: { commentsCount: -1 } });
  }
  if (comment.blogId) {
    await Blog.findByIdAndUpdate(comment.blogId, { $inc: { commentsCount: -1 } });
  }

  await comment.deleteOne();
  return { deleted: true };
};
