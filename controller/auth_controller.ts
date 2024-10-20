import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import User from "../db/models/UserModel";
import { createError } from "../utils/createError";
import { UserType } from "../utils/typeDefs";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const UserData: UserType = req.body;
        const checkUser1 = await User.findOne({ username: UserData.username });
        const checkUser2 = await User.findOne({ email: UserData.email });

        if (checkUser1 || checkUser2) next(createError(409, "try a different username or email"));
        else {
            const hashedPassword = bcrypt.hashSync(UserData.password, 10);
            UserData.password = hashedPassword;
            const newUser = User.create(UserData);
            (await newUser).save();
            next(createError(200, "created account succesfully"));
        }
    } catch (e) {
        return next(e);
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password }: UserType = req.body;
        const user = await User.findOne({ username });

        if (!user) return next(createError(404, "User not found"));
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) return next(createError(401, "wrong password"));

        const { name, username: userName, email, _id } = user;
        const resData = {
            name, username: userName, email, _id, token: ""
        }

        const token = jwt.sign({
            _id: user._id,
        }, process.env.JWT_SECRET || "were-is-my-secret", { expiresIn: '740h' });

        return res.cookie("token", token, {
            httpOnly: true
        }).status(200).json({ ...resData, token: token });

    } catch (e) {
        return next(e);
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token").json({ msg: "user logged out" }).status(200);
}