import express from "express";
import getZipcontents from "../controller/zipController.js";
const router = express.Router();

router.get("/decompress", getZipcontents);

export default router;
