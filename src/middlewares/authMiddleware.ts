import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  sub: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    res.status(500).json({ message: "Server misconfiguration" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
