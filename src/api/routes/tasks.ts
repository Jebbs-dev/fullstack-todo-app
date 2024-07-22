import { Router, Request, Response } from "express";
// import { tasks } from "../../utils/constants";
import { ExtendedRequest, TaskType, UserType } from "../../../types";
import { Task } from "../../schemas/mongoose/task";
import { taskValidation } from "../../utils/validationSchema";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { User } from "../../schemas/mongoose/user";
import passport from "passport";
import { resolveUserAuth } from "../../middlewares/resolveUserAuth";

const router: Router = Router();

router.get("/api/tasks", resolveUserAuth, async (req: ExtendedRequest, res: Response) => {
  const { userId } = req;

  try {
    const tasks = await Task.find().where({userId});

    if (tasks.length === 0) {
      throw new Error("No tasks found");
    }

    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.sendStatus(404).send({error: "No tasks found"});
  }
});

router.post(
  "/api/tasks",
  resolveUserAuth,
  checkSchema(taskValidation),
  async (req: ExtendedRequest, res: Response) => {
    const { userId } = req;

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send(result.array()[0].msg);
    }

    const data = matchedData(req);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const task = new Task({ ...data, userId });

    try {
      const newTask = await task.save();

      // (user as any).tasks.push(newTask._id);
      // await user.save();

      return res.status(200).send(newTask);
    } catch (error) {
      console.log(error);
      return res.sendStatus(401);
    }
  }
);

router.get("/api/tasks/:id", resolveUserAuth, async (req: ExtendedRequest, res: Response) => {
  const {
    params: { id },
    userId,
  } = req;

  try {
    const task = await Task.findById(id).where({userId});

    if (!task) {
      throw new Error("Task not found");
    }

    return res.status(200).send(task);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.patch("/api/tasks/:id", resolveUserAuth, async (req: ExtendedRequest, res: Response) => {
  const {
    params: { id },
    userId,
    body,
  } = req;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, body).where({userId});

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return res.status(200).send(updatedTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.delete("/api/tasks/:id", resolveUserAuth, async (req: ExtendedRequest, res: Response) => {
  const {
    params: { id },
    userId,
  } = req;

  try {
    const task = await Task.findByIdAndDelete(id).where({userId});

    if (!task) {
      throw new Error("Task not found");
    }

    return res.status(200).send("Task deleted!");
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;
