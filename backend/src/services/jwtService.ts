import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import app from '../app.js';
const SECRET = process.env.JWT_SECRET ?? "dev_secret";


export function signToken(payload: object): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = jwt.verify(token, SECRET) as JwtPayload & { userId?: string };
    (req as any).userId = payload.userId; // attach userId to request
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

