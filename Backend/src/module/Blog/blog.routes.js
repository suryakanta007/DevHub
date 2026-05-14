import express from "express";
import protect from "../../common/middleware/auth.middleware.js";
import validate from "../../common/middleware/validate.middleware.js";
import * as blogController from "./blog.controller.js";
import CreateBlogDto from "./dto/create-blog.dto.js";
import UpdateBlogDto from "./dto/update-blog.dto.js";

const router = express.Router();

router.post("/", protect, validate(CreateBlogDto), blogController.createBlog);
router.post("/:id/publish", protect, blogController.publishBlog);
router.get("/", blogController.listBlogs);
router.get("/:id", blogController.getBlog);
router.patch("/:id", protect, validate(UpdateBlogDto), blogController.updateBlog);
router.delete("/:id", protect, blogController.deleteBlog);
router.post("/:id/like", protect, blogController.toggleLike);
router.post("/:id/save", protect, blogController.toggleSave);

export default router;
