import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/messageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import skillRouter from "./routes/skillRoutes.js";
import fileUpload from "express-fileupload";
import applicationRouter from "./routes/softwareApplicationRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import timelineRouter from "./routes/timelineRoutes.js";
import { errorMiddleware } from "./middlewares/error.js";
import { dbConnection } from "./database/dbconnection.js";

const app = express();

dotenv.config({ path: "./config/config.env" });


const allowedOrigins = [
  process.env.PORTFOLIO_URL || "https://shiv-singh-portfolio.netlify.app/",
  process.env.DASHBOARD_URL || "https://shiv-portfolio-login.netlify.app/login",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline",timelineRouter);
app.use("/api/v1/softwareapplication", applicationRouter);
app.use("/api/v1/skill",skillRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
