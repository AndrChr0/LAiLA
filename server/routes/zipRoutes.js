import express from "express";
import { getZipcontents } from "../controller/zipController.js";
import multer from "multer";
import { auth, authRole } from "../middleware/verifyToken.js";
const router = express.Router();
const upload = multer({
    dest: "ClientZipUploads/",
    mimetype: "application/x-zip-compressed",
});

router.post("/decompress", auth, authRole("student"), upload.single("zipUpload"), getZipcontents);

export default router;
