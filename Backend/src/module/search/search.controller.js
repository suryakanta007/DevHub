import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/utils/api-response.js";
import ApiError from "../../common/utils/api-error.js";
import * as searchService from "./search.service.js";

export const globalSearch = asyncHandler(async (req, res) => {
  const { q, type, page, limit } = req.query;
  if (!q) throw ApiError.badRequest("Search query 'q' is required");

  const result = await searchService.globalSearch({ q, type, page: +page, limit: +limit });
  res.status(200).json(new ApiResponse(200, result, "Search results"));
});

export const getTrending = asyncHandler(async (req, res) => {
  const { limit } = req.query;
  const result = await searchService.getTrending({ limit: +limit || 10 });
  res.status(200).json(new ApiResponse(200, result, "Trending content"));
});

export const getLatest = asyncHandler(async (req, res) => {
  const { limit } = req.query;
  const result = await searchService.getLatest({ limit: +limit || 10 });
  res.status(200).json(new ApiResponse(200, result, "Latest content"));
});
