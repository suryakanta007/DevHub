import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as projectService from "./project.service.js";

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, project, "Project created"));
});

export const listProjects = asyncHandler(async (req, res) => {
  const result = await projectService.listProjects(req.query);
  res.status(200).json(new ApiResponse(200, result, "Projects fetched"));
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await projectService.getProject(req.params.id);
  res.status(200).json(new ApiResponse(200, project, "Project fetched"));
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.updateProject(req.params.id, req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, project, "Project updated"));
});

export const deleteProject = asyncHandler(async (req, res) => {
  const result = await projectService.deleteProject(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, "Project deleted"));
});

export const toggleLike = asyncHandler(async (req, res) => {
  const result = await projectService.toggleLike(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, result.liked ? "Liked" : "Unliked"));
});

export const toggleSave = asyncHandler(async (req, res) => {
  const result = await projectService.toggleSave(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, result.saved ? "Saved" : "Unsaved"));
});
