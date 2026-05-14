import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as blogService from "./blog.service.js";

export const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlog(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, blog, "Blog created as draft"));
});

export const publishBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.publishBlog(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, blog, "Blog published"));
});

export const listBlogs = asyncHandler(async (req, res) => {
  const result = await blogService.listBlogs(req.query);
  res.status(200).json(new ApiResponse(200, result, "Blogs fetched"));
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.getBlog(req.params.id);
  res.status(200).json(new ApiResponse(200, blog, "Blog fetched"));
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, blog, "Blog updated"));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const result = await blogService.deleteBlog(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, "Blog deleted"));
});

export const toggleLike = asyncHandler(async (req, res) => {
  const result = await blogService.toggleLike(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, result.liked ? "Liked" : "Unliked"));
});

export const toggleSave = asyncHandler(async (req, res) => {
  const result = await blogService.toggleSave(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, result.saved ? "Saved" : "Unsaved"));
});
