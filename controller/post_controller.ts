import { Request, Response, NextFunction } from "express";
import Post from "../db/models/PostModel";
import User from "../db/models/UserModel";
import { createError } from "../utils/createError";
import { PostType } from "../utils/typeDefs";
import mongoose from "mongoose";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const tag = req.query.tag;
    let posts;

    if (tag === "none") posts = await Post.find({}).populate('author likedBy');
    else posts = await Post.find({ tags: { "$in": [tag] } });

    return res.status(200).json(posts);
}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId).populate('author likedBy');
        return res.status(200).json(post);
    } catch (e) {
        return next(createError(400, "error getting post"));
    }
}

export const newPost = async (req: Request, res: Response, next: NextFunction) => {
    const postData: PostType = { ...req.body, likes: 0 };
    const userId = req.params.userId;

    try {
        const newPost = await Post.create({ ...postData, author: userId });

        (await newPost).save();
        await User.findByIdAndUpdate(userId, { $push: { myPosts: newPost._id } }, { new: false });
        return next(createError(200, "created post successfully!"))
    } catch (e) {
        return next(createError(403, "error creating new post"));
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const userId = req.params.userId;

    try {
        await Post.findByIdAndDelete(postId);
        await User.findByIdAndUpdate(userId, { $push: { myPosts: postId } }, { new: false });
        return res.status(200).json({ msg: "deleted post" });
    } catch (e) {
        return next(createError(403, "error deleting post"));
    }
}

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const post = await Post.findOne({ _id: postId });
    let likedBy = post?.likedBy;
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    if (!post) return res.status(404).send("post not found");

    try {
        const isLiked = post.likedBy.includes(userId);

        if (!isLiked) {
            likedBy?.push(userId);
            await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 }, $push: { likedBy: userId } }, { new: false });
            res.send('liked post');
        } else {
            likedBy = likedBy?.filter(e => e !== userId);
            await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 }, $pull: { likedBy: userId } }, { new: false });
            res.send("unliked post");
        }
    } catch (e) {
        return next(createError(403, "error liking post"));
    }
}

export const editPost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    try {
        const postData: PostType = req.body;
        await Post.findByIdAndUpdate(postId, postData);
        return res.status(200).json({ msg: "updated post" });
    } catch (e) {
        return next(createError(403, "error editing post"));
    }
}