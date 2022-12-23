import { Router } from "express";
import {
  destroy,
  createCategory,
  editCategory,
} from "../controllers/CategoryController.js";

const router = Router();

router.delete(`/:id`, destroy);
router.patch(`/:id`, editCategory);
router.post("/", createCategory);

export default router;
