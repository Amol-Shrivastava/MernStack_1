import { Router } from "express";
import UserModel from "../models/UserModel.js";

const router = Router();

router.post("/register", async (req, res) => {
  //1. Get all the form data
  const { email, password, firstName, lastName } = req.body;
  //2. Check if user already exists
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    res.status(406).json({ message: "User already exists" });
    return;
  } else {
    const user = await UserModel({ email, password, firstName, lastName });
    const savedUser = await user.save();
    console.log(savedUser);
    res.status(200).json({ message: "New User created successfully" });
  }
});

export default router;
