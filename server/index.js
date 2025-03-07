import express from "express";
import dotenv from "dotenv";
import aiZipRoutes from "./routes/zipRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(cors());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
}
// Configures express to use the CORS policy, allowing communication between the frontend and backend
app.use(cors(corsOptions))
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

// route for decompressing the zip file, AI has yet to be implemented (AC - 23/02)
app.use("/api/ai", aiZipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(PORT, () => {
  console.log("Server is jogging on port " + PORT);
});
