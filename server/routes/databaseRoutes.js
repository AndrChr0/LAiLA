import express from "express";
import { getUsers } from "../controller/databaseController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

export default router;
