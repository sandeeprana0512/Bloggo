import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";
import { createError } from "../utils/createError";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token.length === 0) return next(createError(403, "you are not authenticated"));

    else {
        jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
            if (payload === undefined) return next(createError(403, "invalid token"));
            if (err) return next(createError(403, "invalid token"));

            if (payload._id !== req.params.userId) return next(createError(403, "invalid token"));
            next();
        })
    }
}
