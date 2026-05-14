import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    avatar: { type: String, default: null },
    avatarPublicId: { type: String, default: null },
    banner: { type: String, default: null },
    bannerPublicId: { type: String, default: null },
    bio: { type: String, maxlength: 500, default: "" },
    location: { type: String, default: "" },
    skills: [{ type: String }],
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    savedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    refreshToken: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ── Text search index ──────────────────────────────────────────────────────────
userSchema.index({ username: "text", fullName: "text", skills: "text" });

// ── Hash password before save ──────────────────────────────────────────────────
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// ── Instance method: compare password ─────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ── Sanitize output ───────────────────────────────────────────────────────────
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.avatarPublicId;
  delete obj.bannerPublicId;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;
