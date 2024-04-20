import { Router } from "express";
import { getStudent, poststudent } from "../controllers/student.controller.js";

const router = Router();

router.get("/data", getStudent);
router.post("/", poststudent);

export default router;
