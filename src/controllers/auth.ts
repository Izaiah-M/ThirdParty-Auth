import { Request, Response } from "express";
import { User } from "../models/User";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const googleSignUp = async (req: Request, res: Response) => {
  const redirectUrl = "http://localhost:8080/oauth";

  try {
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline", // For the sake of testing
      scope: "https://www.googleapis.com/auth/userinfo.profile openid",
      prompt: "consent",
    });

    res.json({ url: authorizeUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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

export { signup, googleSignUp };
