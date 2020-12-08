import express from "express";
import path from "path";

const router: express.Router = express.Router();

router.get("/api", (req, res) => {
  res.send("App is running");
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../public", "index.html"));
});
export default router;
