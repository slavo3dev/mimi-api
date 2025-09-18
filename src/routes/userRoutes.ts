import { Router } from "express";
import { UserController } from "../controllers/userControler";

const router = Router()

router.get("/",UserController.getUsers)
router.get("/:id",UserController.getUser)
router.get("/",UserController.createUser)

export default router;