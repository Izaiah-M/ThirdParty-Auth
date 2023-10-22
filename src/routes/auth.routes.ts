import { Express, Request, Response } from "express";
import { signup } from "../controllers/auth"; // Import the signup controller

export function AuthRoutes(app: Express) {
  app.use(function (req: Request, res: Response, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/signup", signup);
}
