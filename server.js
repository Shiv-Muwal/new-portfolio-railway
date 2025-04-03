import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();
const app = express();

// ✅ Fix for `__dirname` in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Middleware
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body
app.use(fileUpload({ useTempFiles: true }));

// ✅ Allow CORS
const allowedOrigins = [
  process.env.PORTFOLIO_URL, 
  process.env.DASHBOARD_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin?.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Cloudinary Config (Fix)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Serve Portfolio Frontend
app.use(express.static(path.join(__dirname, "../portfolio/dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../portfolio/dist", "index.html"));
});

// ✅ Serve Dashboard Frontend
app.use("/admin", express.static(path.join(__dirname, "../dashboard/dist")));

app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard/dist", "index.html"));
});

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
