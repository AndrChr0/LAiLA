import express from "express";
import dotenv from "dotenv";
import aiZipRoutes from "./routes/zipRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
// feedback
// import xRoutes from "./routes/xRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 5000;
app.use(express.json());

// route for decompressing the zip file, AI has yet to be implemented (AC - 23/02)
app.use("/api/ai", aiZipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
// feedback
// app.use("/api/path", xRoutes);

app.listen(PORT, () => {
  console.log("Server is jogging on port " + PORT);
});
