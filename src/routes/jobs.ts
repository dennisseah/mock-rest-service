import express from "express";
import controller from "../controllers/jobs";
const router = express.Router();

router.get("/jobs", controller.list);
router.get("/jobs/:id", controller.get);
router.delete("/jobs/:id", controller.del);
router.post("/jobs", controller.create);
router.post("/jobs/:id/process", controller.process);

export = router;
