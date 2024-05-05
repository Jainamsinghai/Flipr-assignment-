import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import authRoutes from "./routes/authRoutes.js";
import getUserRoutes from "./routes/authRoutes.js";
import instanceRoutes from "./controllers/instanceController.js";
import databaseRoutes from "./controllers/databaseController.js";
import deleteUser from "./routes/authRoutes.js";
import editUser from "./routes/authRoutes.js";

// Secured routes
app.use("/api/v1/auth", authRoutes, getUserRoutes, deleteUser, editUser);
app.use("/api/v1/instances", instanceRoutes);
app.use("/api/v1/databases", databaseRoutes);

export { app };
