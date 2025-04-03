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
  process.env.DASHBOARD_URL,
  "http://localhost:5173", // Allow local Vite dev server
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

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Serve Portfolio Frontend
const portfolioPath = path.join(__dirname, "../portfolio/dist");
if (fs.existsSync(portfolioPath)) {
  app.use(express.static(portfolioPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(portfolioPath, "index.html"));
  });
} else {
  console.error("❌ Portfolio build files not found!");
}

// ✅ Serve Dashboard Frontend
const dashboardPath = path.join(__dirname, "../dashboard/dist");
if (fs.existsSync(dashboardPath)) {
  app.use("/admin", express.static(dashboardPath));
  app.get("/admin/*", (req, res) => {
    res.sendFile(path.join(dashboardPath, "index.html"));
  });
} else {
  console.error("❌ Dashboard build files not found!");
}

// ✅ Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
