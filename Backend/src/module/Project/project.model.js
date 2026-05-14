import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, required: [true, "Description is required"] },
    thumbnail: { type: String, default: null },
    thumbnailPublicId: { type: String, default: null },
    images: [{ type: String }],
    techStack: [{ type: String }],
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    commentsCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── Text search index ──────────────────────────────────────────────────────────
projectSchema.index({ title: "text", description: "text", techStack: "text" });

const Project = mongoose.model("Project", projectSchema);
export default Project;
