import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const imageUploader = async (image) => {
  if (!image?.tempFilePath) {
    throw new Error("File path is missing");
  }
  try {
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "workhance",
    });

    // Delete the temporary file
    fs.unlink(image.tempFilePath, (err) => {
      if (err) {
        console.error(
          "Failed to delete temporary file:",
          image.tempFilePath,
          err
        );
      } else {
        console.log("Successfully deleted temporary file:", image.tempFilePath);
      }
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const pdfUploader = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "workhance",
      resource_type: "raw",
      access_mode: "public",
    });

    const tempFilePath = file.tempFilePath;
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error("Failed to delete temporary file:", tempFilePath, err);
      } else {
        console.log("Successfully deleted temporary file:", tempFilePath);
      }
    });

    return result.secure_url;
  } catch (err) {
    console.log(err);
    throw err;
  }
};