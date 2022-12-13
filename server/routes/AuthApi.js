import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

const router = Router();

router.post("/register", async (req, res) => {
  //1. Get all the form data
  const { email, password, firstName, lastName } = req.body;
  //2a. Check if user already exists
  if (Object.keys(_checkUserExists(email, res)).length !== 0) {
    //2b. User already exists
    return;
  } else {
    //2c. New User creation

    //3a Generating Hash password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // const userExists = await _checkUserExists(email, res);
  const userExist = await UserModel.findOne({ email });
  if (!userExist) {
    res.status(406).json({ message: "User not found" });
    return;
  } else {
    // Load hash(userExists.password) from your password DB.
    const matched = bcrypt.compareSync(password, userExist.password);
    if (!matched) {
      res.status(406).json({ message: "Credentials not found" });
    } else {
      //1a. User is found now create JWT token

      //1b. Create payload to supply to JWT token
      const payload = {
        username: email,
        _id: userExist._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.status(200).json({ message: "User matched", token, userExist });
    }
  }
});

const _checkUserExists = async (email, response) => {
  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    response.status(406).json({ message: "User already exists" });
  }
  return userExist;
};

export default router;
