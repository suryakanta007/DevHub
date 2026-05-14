import asyncHandler from "../../common/utils/asyncHandler.js";
import ApiResponse from "../../common/utils/api-response.js";
import * as followService from "./follow.service.js";

export const follow = asyncHandler(async (req, res) => {
  const result = await followService.follow(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, result, "Followed successfully"));
});

export const unfollow = asyncHandler(async (req, res) => {
  const result = await followService.unfollow(req.user._id, req.params.id);
  res.status(200).json(new ApiResponse(200, result, "Unfollowed successfully"));
});

export const getFollowers = asyncHandler(async (req, res) => {
  const result = await followService.getFollowers(req.params.id, req.query);
  res.status(200).json(new ApiResponse(200, result, "Followers fetched"));
});

export const getFollowing = asyncHandler(async (req, res) => {
  const result = await followService.getFollowing(req.params.id, req.query);
  res.status(200).json(new ApiResponse(200, result, "Following fetched"));
});
