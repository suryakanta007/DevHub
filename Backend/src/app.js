import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// ── Route imports ──────────────────────────────────────────────────────────────
import authRoutes from "./module/auth/auth.routes.js";
import userRoutes from "./module/user/user.routes.js";
import projectRoutes from "./module/Project/project.routes.js";
import blogRoutes from "./module/Blog/blog.routes.js";
import { commentStandaloneRouter } from "./module/comment/comment.routes.js";
import searchRoutes from "./module/search/search.routes.js";

// ── Comment controllers (mounted under project/blog) ───────────────────────────
import {
  addProjectComment,
  getProjectComments,
  addBlogComment,
  getBlogComments,
} from "./module/comment/comment.controller.js";
import protect from "./common/middleware/auth.middleware.js";
import validate from "./common/middleware/validate.middleware.js";
import CreateCommentDto from "./module/comment/dto/create-comment.dto.js";

// ── Error handler ──────────────────────────────────────────────────────────────
import errorHandler from "./common/middleware/error.middleware.js";

const app = express();

// ── Core Middleware ────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Health check ───────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevHub API is running 🚀",
    version: "1.0.0",
  });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
const API = "/api/v1";

app.use(`${API}/auth`, authRoutes);
app.use(`${API}/users`, userRoutes);
app.use(`${API}/projects`, projectRoutes);
app.use(`${API}/blogs`, blogRoutes);

// ── Comment sub-routes (mounted under project/blog) ────────────────────────────
app.post(`${API}/projects/:id/comments`, protect, validate(CreateCommentDto), addProjectComment);
app.get(`${API}/projects/:id/comments`, getProjectComments);
app.post(`${API}/blogs/:id/comments`, protect, validate(CreateCommentDto), addBlogComment);
app.get(`${API}/blogs/:id/comments`, getBlogComments);

// ── Standalone comment delete ──────────────────────────────────────────────────
app.use(`${API}/comments`, commentStandaloneRouter);

// ── Search & Discovery ─────────────────────────────────────────────────────────
app.use(`${API}`, searchRoutes);

// ── 404 Handler ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ───────────────────────────────────────────────────────
app.use(errorHandler);

export default app;