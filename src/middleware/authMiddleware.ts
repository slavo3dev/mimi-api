// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabaseClient";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (req.method === "GET") {
      return next()
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

     (req as any).user = data.user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};
