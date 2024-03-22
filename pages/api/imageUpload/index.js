// pages/api/upload.js
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { image } = req.body; // Assuming you send the image as base64 encoded string
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: "travelapp",
        transformation: {
          width: 600,
          height: 300,
          crop: "fill",
        },
      });
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
