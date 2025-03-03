import express from "express";
import getZipcontents from "../controller/zipController.js";
import multer from "multer";
import fs from "fs";

const upload = multer({
  dest: "ClientZipUploads/",
  mimetype: "application/x-zip-compressed",
});

const router = express.Router();

router.post("/decompress", upload.single("zipUpload"), getZipcontents);

export default router;
