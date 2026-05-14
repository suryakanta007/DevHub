import { v2 as cloudinary } from "cloudinary";
import ApiError from "./api-error.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer from multer memory storage
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<{url: string, publicId: string}>}
 */
export const uploadToCloudinary = (buffer, folder = "devhub") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) return reject(ApiError.internal("Cloudinary upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};

/**
 * Delete an asset from Cloudinary by publicId.
 * @param {string} publicId
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Non-critical — log but don't fail the request
    console.warn(`⚠️  Cloudinary delete failed for publicId: ${publicId}`);
  }
};

export default cloudinary;
