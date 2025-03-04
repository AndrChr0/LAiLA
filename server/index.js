import express from "express";
import dotenv from "dotenv";
import aiZipRoutes from "./routes/zipRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// courses
import courseRoutes from "./routes/courseRoutes.js";
// assignments
// import xRoutes from "./routes/xRoutes.js";
// feedback
// import xRoutes from "./routes/xRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());

// route for decompressing the zip file, AI has yet to be implemented (AC - 23/02)
app.use("/api/ai", aiZipRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// courses
app.use("/api/courses", courseRoutes);
// assignments
// app.use("/api/path", xRoutes);
// feedback
// app.use("/api/path", xRoutes);

app.listen(PORT, () => {
  console.log("Server is jogging on port " + PORT);
});
