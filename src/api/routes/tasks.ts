import { Router } from "express";
import { tasks } from "../../utils/constants";
import { TaskType } from "../../../types";

const router: Router = Router();

router.get("/api/tasks", (req, res) => {
  console.log(req.headers.cookie);
  if (req.cookies.hello && req.cookies.hello === "world") {
    res.send(tasks);
  }

  res.send({msg: "Sorry, you need the correct cookies."})
});
router.get("/api/tasks/pending", (req, res) => {
  const task = tasks.find((task) => task.status === "pending");
  res.send(task);
});

router.get("/api/tasks/progressing", (req, res) => {
  const task = tasks.find((task) => task.status === "in progress");
  res.send(task);
});

router.get("/api/tasks/completed", (req, res) => {
  const task = tasks.find((task) => task.status === "completed");
  res.send(task);
});

router.get("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const parsedId = parseInt(id);

  const task = tasks.find((task: TaskType) => task.id === parsedId);

  if (!task) {
    return res.status(404).send("Task not found");
  }

  res.send(task);
});

export default router;
