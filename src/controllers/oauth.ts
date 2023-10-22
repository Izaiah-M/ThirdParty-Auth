import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

const { CLIENT_ID, CLIENT_SECRET } = process.env;

// Getting user info from Google
const getUserData = async (accessToken: string) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  console.log(data);
};

const getInfo = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const redirectUrl = "http://localhost:8080/oauth";
    const oAuth2Client = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      redirectUrl
    );

    const response = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(response.tokens);

    const user = oAuth2Client.credentials;
    console.log("Credentials", user);

    await getUserData(user.access_token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getInfo };
