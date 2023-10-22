import { Request, Response } from "express";
import { User } from "../models/User";

const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signup };
