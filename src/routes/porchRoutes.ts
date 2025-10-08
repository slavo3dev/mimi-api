import express from "express";
import { PorchController } from "../controllers/PorchController";

const router = express.Router();

router.get("/", PorchController.getAll);
router.get("/:id", PorchController.getById);
router.post("/", PorchController.create);
router.delete("/:id", PorchController.delete);

export default router;
