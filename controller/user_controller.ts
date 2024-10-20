import { Request, Response, NextFunction } from "express";
import User from "../db/models/UserModel";
import { createError } from "../utils/createError";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";

export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  try {
    const isUser = await User.findById(userId);

    if (!isUser) return next(createError(404, "user not found"));

    const user = await User.findById(userId).populate('followers follows myPosts');

    return res.status(200).json(user);

  } catch (e) {
    next(createError(404, "user not found or error"))
  }
}

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = new mongoose.Types.ObjectId(req.params.userId);
  const followId = new mongoose.Types.ObjectId(req.params.followId);

  try {
    const user = await User.findById(userId);
    const isFollow = user?.follows.includes(followId);

    if (isFollow) {
      await User.findByIdAndUpdate(userId, { $pull: { follows: followId } }, { new: false });
      await User.findByIdAndUpdate(followId, { $pull: { followers: userId } }, { new: false });

      return res.status(200).json({ msg: "unfollowed user" });

    } else {
      await User.findByIdAndUpdate(userId, { $push: { follows: followId } }, { new: false });
      await User.findByIdAndUpdate(followId, { $push: { followers: userId } }, { new: false });

      return res.status(200).json({ msg: "followed user" });
    }
  } catch (e) {
    return next(createError(403, "error following user"));
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const newData = req.body;

  try {
    await User.findByIdAndUpdate(userId, newData, { new: false });
    return res.status(200).json({ msg: "updated user data" });
  } catch (e) {
    return next(createError(403, "error updating user"));
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  try {
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ msg: "delted user" });
  } catch (e) {
    return next(createError(403, "error deleting user"));
  }
}


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { _id, token } = req.body;
  if (!token || token.length === 0) return next(createError(403, "you are not authenticated"));

  else {
    jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
      if (payload === undefined) return next(createError(403, "invalid token"));
      if (err) return next(createError(403, "invalid token"));

      if (payload._id !== _id) return next(createError(403, "invalid token"));
      res.status(200).json({ msg: "logged in" })
    })
  }
}