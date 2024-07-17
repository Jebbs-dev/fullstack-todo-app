import { Router, Request, Response } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";

import { resolveIndexByUserId } from "../../middlewares/resolveUserIndex";
import { User } from "../../schemas/mongoose/user";

import { userValidationSchema } from "../../utils/validationSchema";
import { hashPassword } from "../../utils/helpers";

const router: Router = Router();

// router.get("/api/users", (req: Request, res: Response) => {
//   const {
//   query
//   } = req;
//   const { filter, value } = query;
//   console.log(query);

//   if (filter && value) {
//     return res.send(
//       users.filter((user: UserType) =>
//         String(user[filter as keyof UserType]).includes(value as string)
//       )
//     );
//   }
//   return res.send(users);
// });

router.get("/api/users", async (req: Request, res: Response) => {
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (error, sessionData) => {
    if (error) {
      console.log(error);
    }
    console.log(sessionData);
  });

  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get(
  "/api/users/:id",
  async (req: Request, res: Response) => {
    const {
      params: { id },
    } = req;

    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.sendStatus(404);
    }
  }
);

router.post(
  "/api/users",
  checkSchema(userValidationSchema),
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send(result.array()[0].msg);
    }

    const data = matchedData(req);
    data.password = hashPassword(data.password);

    console.log(data);

    const user = new User(data);
    try {
      const savedUser = await user.save();
      return res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
);

router.patch("/api/users/:id", async (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, body);
    if (!updatedUser) {
      throw new Error("User not found!");
    }
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
});

router.delete("/api/users/:id", async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(404);
  }
});

export default router;
