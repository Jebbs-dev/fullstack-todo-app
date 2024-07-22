import { Router } from "express";

import authRouter from "./auth"
import usersRouter from "./users";
import tasksRouter from "./tasks";

const router: Router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(tasksRouter);

export default router;