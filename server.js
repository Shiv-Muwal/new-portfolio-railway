import express from "express";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(fileUpload({ useTempFiles: true }));

// Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Add a route for "/"
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at port ${process.env.PORT}`);
});
