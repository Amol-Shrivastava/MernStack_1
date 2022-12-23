import { Router } from "express";
import TransactionRouter from "./transactions.js";
import AuthApi from "./AuthApi.js";
import UserApi from "./UserApi.js";
import CategoryApi from "./CategoryApi.js";
import passport from "passport";

const router = Router();

router.use(
  "/transaction",
  passport.authenticate("jwt", { session: false }),
  TransactionRouter
);
router.use("/auth", AuthApi);
router.use("/user", UserApi);
router.use(
  "/category",
  passport.authenticate("jwt", { session: false }),
  CategoryApi
);

export default router;
