import { Router } from "express";
import { Request, Response } from "express";
import passport from "passport";
import "../../strategies/local-strategy";

const router: Router = Router();

router.post(
  "/api/auth",
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    try {
      return res.status(200).send("Logged in successfully!");
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  }
);

router.get("/api/auth/status", (req: Request, res: Response) => {
  return req.user
    ? res.status(200).send(req.user)
    : res.status(401).send({ msg: "Not Authenticated" });
});

router.post("/api/auth/logout", (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);

  req.logOut((error) => {
    if (error) {
      res.sendStatus(400);
    }
    res.status(200).send("Logged out successfully!");
  });
});

export default router;
