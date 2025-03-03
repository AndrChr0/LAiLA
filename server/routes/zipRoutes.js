import express from "express";
import getZipcontents from "../controller/zipController.js";
import multer from "multer";

const upload = multer({ dest: "ClientZipUploads/" });

const router = express.Router();

router.post("/decompress", upload.single("zipUpload"), getZipcontents);

export default router;
