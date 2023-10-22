import { Express, Request, Response } from "express";
import { signup, googleSignUp } from "../controllers/auth";
import { getInfo } from "../controllers/oauth";

export function AuthRoutes(app: Express) {
  app.use(function (req: Request, res: Response, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header(
      "Referrer-Policy",
      "no-referrer-when-downgrade" // because we are using http for now
    );
    next();
  });

  app.post("/api/signup", signup);
  app.post("/api/oauth/google", googleSignUp);

  app.get("/oauth", getInfo);
}
