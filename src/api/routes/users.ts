import { Router, Request, Response } from "express";

import { users } from "../../utils/constants";
import { resolveIndexByUserId } from "../../middlewares/resolveUserIndex";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { ExtendedRequest } from "../../../types";
import { loginValidationSchema } from "../../utils/validationSchema";

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

router.get(
  "/api/users",
  (req: Request, res: Response) => {
    console.log(req.session);
    res.status(201).send(users);
  }
);

router.get("/api/users/:id", resolveIndexByUserId, (req: ExtendedRequest, res: Response) => {
  const { findUserIndex } = req;

  const index = Number(findUserIndex);
  const user = users[index];

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  return res.send(user);
});

router.post("/api/users", checkSchema(loginValidationSchema), (req: Request, res: Response) => {
  const { body } = req;

  const result =  validationResult(req);
  console.log(result);

  if (!result.isEmpty()) {
    return res.status(400).send(result.array()[0].msg);
  }

  const newUser = {
    id: users[users.length - 1].id + 1,
    ...body,
  };
  users.push(newUser);

  return res.send(users);
});

router.patch("/api/users/:id", resolveIndexByUserId, (req: ExtendedRequest, res: Response) => {
  const { body, findUserIndex} = req;

  const index = Number(findUserIndex);
  const user = users[index];

  users[index] = {...users[index], ...body}

  return res.status(200).send(user);
});

router.delete("/api/users/:id", resolveIndexByUserId, (req: ExtendedRequest, res: Response)=> {
  const { findUserIndex } = req;

  const index = Number(findUserIndex);
  users.splice(index, 1);

  return res.status(200).send(users);
})

export default router;
