import Project from "./project.model.js";
import User from "../auth/auth.model.js";
import ApiError from "../../common/utils/api-error.js";

// ── Create ────────────────────────────────────────────────────────────────────
export const createProject = async (userId, data) => {
  const project = await Project.create({ ...data, createdBy: userId });
  return project.populate("createdBy", "username fullName avatar");
};

// ── List (paginated + filtered + searched) ─────────────────────────────────────
export const listProjects = async ({ q, techStack, sort = "latest", page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const filter = {};

  if (q) {
    filter.$text = { $search: q };
  }

  if (techStack) {
    const techs = techStack.split(",").map((t) => t.trim());
    filter.techStack = { $in: techs };
  }

  const sortOption =
    sort === "trending" ? { "likes.length": -1, views: -1 } : { createdAt: -1 };

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(+limit)
      .populate("createdBy", "username fullName avatar")
      .lean(),
    Project.countDocuments(filter),
  ]);

  return { projects, total, page: +page, limit: +limit, pages: Math.ceil(total / limit) };
};

// ── Get single (with view increment) ─────────────────────────────────────────
export const getProject = async (id) => {
  const project = await Project.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate("createdBy", "username fullName avatar");

  if (!project) throw ApiError.notFound("Project not found");
  return project;
};

// ── Update (owner only) ───────────────────────────────────────────────────────
export const updateProject = async (id, userId, updates) => {
  const project = await Project.findById(id);
  if (!project) throw ApiError.notFound("Project not found");
  if (project.createdBy.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not the owner of this project");
  }

  Object.assign(project, updates);
  await project.save();
  return project;
};

// ── Delete (owner only) ───────────────────────────────────────────────────────
export const deleteProject = async (id, userId) => {
  const project = await Project.findById(id);
  if (!project) throw ApiError.notFound("Project not found");
  if (project.createdBy.toString() !== userId.toString()) {
    throw ApiError.forbidden("You are not the owner of this project");
  }

  await project.deleteOne();
  return { deleted: true };
};

// ── Like toggle ───────────────────────────────────────────────────────────────
export const toggleLike = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) throw ApiError.notFound("Project not found");

  const alreadyLiked = project.likes.includes(userId);
  const update = alreadyLiked
    ? { $pull: { likes: userId } }
    : { $addToSet: { likes: userId } };

  const updated = await Project.findByIdAndUpdate(projectId, update, { new: true });
  return { liked: !alreadyLiked, count: updated.likes.length };
};

// ── Save toggle ───────────────────────────────────────────────────────────────
export const toggleSave = async (projectId, userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  const alreadySaved = user.savedProjects.includes(projectId);
  const update = alreadySaved
    ? { $pull: { savedProjects: projectId } }
    : { $addToSet: { savedProjects: projectId } };

  await User.findByIdAndUpdate(userId, update);
  return { saved: !alreadySaved };
};
