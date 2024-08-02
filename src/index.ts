import express, { Express, Request, Response } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import cors from "cors";

import "./strategies/local-strategy";
import router from "./api/routes";

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

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "fullstack-todo-app",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 6,
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
  res.send("Hello, world!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
