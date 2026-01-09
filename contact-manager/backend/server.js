import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "DELETE"],
    credentials: false
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Contact Manager API is running");
});

app.use("/api/contacts", contactRoutes);

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
