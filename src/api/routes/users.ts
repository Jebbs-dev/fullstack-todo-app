import { Router, Request, Response } from "express";

import { users } from "../../utils/constants";

interface UserType {
  id: number;
  name: string;
  email: string;
}

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

router.get("/api/users", (req: Request, res: Response) => {
  res.status(201).send(users);
});

router.get("/api/users/:id", (req: Request, res: Response) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  const user = users.find((user) => user.id === parsedId);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Bad Request. Invalid ID" });
  }
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  return res.send(user);
});

router.post("/api/users", (req: Request, res: Response) => {
  const { body } = req;

  const newUser = {
    id: users[users.length - 1].id + 1,
    ...body,
  };
  users.push(newUser);

  return res.send(users);
});

export default router;
