// import NPM packages
import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" }); // load shared env
dotenv.config(); // load server env
import cors from "cors";
import cookieParser from "cookie-parser";
import { job } from "./utils/cron.js";
// import our modules
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import aiZipRoutes from "./routes/zipRoutes.js";
import assessmentRotues from "./routes/assessmentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";


const corsPATH = process.env.CORS_PATH || "http://localhost";
const corsPORT = process.env.CORS_PORT || 5173;
const app = express();

// definte CORS options
const corsOptions = {
    origin: `${corsPATH}:${corsPORT}`,
    credentials: true
};

// express config
app.use(cors(corsOptions)); // CORS policy, allowing communication between frontend and backend
const PORT = process.env.API_PORT || 5000; // app PORT from env, with 5000 as a fallback if omitted
app.use(express.json()); // JSON parsing
app.use(cookieParser()); // cookie parsing

// routing
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/ai", aiZipRoutes);
app.use("/api/assessment", assessmentRotues);

// globally applied error handling middleware
app.use(errorHandler);

// start the cron job
job.start();

// start the server
app.listen(PORT, () => {
    console.log("Server is jogging on port " + PORT);
});
