import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as commentService from "./comment.service.js";

export const addProjectComment = asyncHandler(async (req, res) => {
  const comment = await commentService.addProjectComment(
    req.params.id,
    req.user._id,
    req.body.text
  );
  res.status(201).json(new ApiResponse(201, comment, "Comment added"));
});

export const addBlogComment = asyncHandler(async (req, res) => {
  const comment = await commentService.addBlogComment(
    req.params.id,
    req.user._id,
    req.body.text
  );
  res.status(201).json(new ApiResponse(201, comment, "Comment added"));
});

export const getProjectComments = asyncHandler(async (req, res) => {
  const result = await commentService.getProjectComments(req.params.id, req.query);
  res.status(200).json(new ApiResponse(200, result, "Comments fetched"));
});

export const getBlogComments = asyncHandler(async (req, res) => {
  const result = await commentService.getBlogComments(req.params.id, req.query);
  res.status(200).json(new ApiResponse(200, result, "Comments fetched"));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const result = await commentService.deleteComment(req.params.id, req.user._id);
  res.status(200).json(new ApiResponse(200, result, "Comment deleted"));
});
