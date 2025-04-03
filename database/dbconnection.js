import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_PORTFOLIO",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Fail fast if MongoDB is unreachable
      socketTimeoutMS: 45000, // Keep the connection alive longer
    });

    console.log("✅ Connected to database!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};
