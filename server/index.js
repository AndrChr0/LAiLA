import express from "express";
import dotenv from "dotenv";
import aiZipRoutes from "./routes/zipRoutes.js";
import databaseRoutes from "./routes/databaseRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
dotenv.config({ path: "../.env" });
const PORT = process.env.PORT || 5000;
app.use(express.json());

// route for decompressing the zip file, AI has yet to be implemented (AC - 23/02)
app.use("/api/ai", aiZipRoutes);

app.use("/api/users", databaseRoutes);

app.listen(PORT, () => {
  console.log("Server is jogging on port " + PORT);
});
