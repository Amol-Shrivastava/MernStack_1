import { Router } from "express";
import bcrypt from "bcrypt";
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
    //3a Generating Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    //3b Storing hash password in db
    const user = await UserModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    //4. Save user into the db
    await user.save();
    res.status(201).json({ message: "New User created successfully" });
  }
});

export default router;
