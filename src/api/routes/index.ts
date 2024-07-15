import { Router } from "express";

import usersRouter from "./users";
import tasksRouter from "./tasks";

const router: Router = Router();

router.use(usersRouter);
router.use(tasksRouter);

export default router;