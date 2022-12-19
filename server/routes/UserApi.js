import { Router } from "express";

import passport from "passport";
import { index } from "../controllers/UserController.js";

const router = Router();

router.get(`/`, passport.authenticate("jwt", { session: false }), index);

export default router;
