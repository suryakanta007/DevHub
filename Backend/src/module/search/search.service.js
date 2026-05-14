import User from "../auth/auth.model.js";
import Project from "../Project/project.model.js";
import Blog from "../Blog/blog.model.js";

// ── Global search ──────────────────────────────────────────────────────────────
export const globalSearch = async ({ q, type, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const textFilter = { $text: { $search: q } };
  const result = {};

  if (!type || type === "users") {
    result.users = await User.find(textFilter, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .select("username fullName avatar bio skills")
      .skip(skip)
      .limit(+limit)
      .lean();
  }

  if (!type || type === "projects") {
    result.projects = await Project.find(textFilter, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .select("title description techStack thumbnail createdBy likes views")
      .populate("createdBy", "username fullName avatar")
      .skip(skip)
      .limit(+limit)
      .lean();
  }

  if (!type || type === "blogs") {
    result.blogs = await Blog.find({ ...textFilter, isPublished: true }, {
      score: { $meta: "textScore" },
    })
      .sort({ score: { $meta: "textScore" } })
      .select("title tags category coverImage author likes readTime")
      .populate("author", "username fullName avatar")
      .skip(skip)
      .limit(+limit)
      .lean();
  }

  return result;
};

// ── Trending (most liked + viewed in last 7 days) ──────────────────────────────
export const getTrending = async ({ limit = 10 } = {}) => {
  const [projects, blogs] = await Promise.all([
    Project.find()
      .sort({ views: -1, "likes.length": -1 })
      .limit(+limit)
      .populate("createdBy", "username fullName avatar")
      .lean(),
    Blog.find({ isPublished: true })
      .sort({ "likes.length": -1 })
      .limit(+limit)
      .populate("author", "username fullName avatar")
      .lean(),
  ]);

  return { projects, blogs };
};

// ── Latest ────────────────────────────────────────────────────────────────────
export const getLatest = async ({ limit = 10 } = {}) => {
  const [projects, blogs] = await Promise.all([
    Project.find()
      .sort({ createdAt: -1 })
      .limit(+limit)
      .populate("createdBy", "username fullName avatar")
      .lean(),
    Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(+limit)
      .populate("author", "username fullName avatar")
      .lean(),
  ]);

  return { projects, blogs };
};
