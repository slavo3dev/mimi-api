import type { Request, Response } from "express";
import { PorchModel } from "../models/PorchModel";

export class PorchController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const data = await PorchModel.getAll();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await PorchModel.getById(id);
      res.status(200).json(data);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { text, email, source } = req.body;
      const newEntry = await PorchModel.create({ text, email, source });
      res.status(201).json(newEntry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await PorchModel.delete(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
