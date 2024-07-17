import express, { Express, Request, Response } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";

import "./strategies/local-strategy";
import router from "./api/routes";

import { ExtendedSession } from "../types";
import { User } from "./schemas/mongoose/user";

dotenv.config();

const app: Express = express();

mongoose
  .connect(String(process.env.MONGO_URL))
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "fullstack-todo-app",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
      // secure: false
    }, // Change to true for production environment to enable HTTPS
    store: MongoStore.create({
      mongoUrl: String(process.env.MONGO_URL),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.get("/", (req: Request, res: Response) => {
  // console.log(req.cookies);
  console.log(req.session);
  console.log(req.session.id);

  (req.session as ExtendedSession).visited = true;
  res.send("Hello, world!");
});

app.post(
  "/api/auth",
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    const {
      body: { email, password },
    } = req;

 

    return res.sendStatus(200);
  }
);

app.get("/api/auth/status", (req: Request, res: Response) => {
  return req.user
    ? res.status(200).send(req.user)
    : res.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/auth/logout", (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);

  req.logOut((error) => {
    if (error) {
      res.sendStatus(400);
    }
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
