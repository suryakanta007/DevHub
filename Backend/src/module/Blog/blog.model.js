import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    content: { type: String, required: [true, "Content is required"] }, // markdown
    coverImage: { type: String, default: null },
    coverImagePublicId: { type: String, default: null },
    tags: [{ type: String }],
    category: { type: String, default: "General" },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    commentsCount: { type: Number, default: 0 },
    readTime: { type: Number, default: 1 }, // minutes
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── Auto-compute readTime before save ─────────────────────────────────────────
blogSchema.pre("save", function () {
  if (this.isModified("content") && this.content) {
    const wordCount = this.content.split(" ").length;
    this.readTime = Math.ceil(wordCount / 200);
  }
});

// ── Text search index ──────────────────────────────────────────────────────────
blogSchema.index({ title: "text", tags: "text" });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
