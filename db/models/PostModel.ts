import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    likes: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [
        {
            type: String,
            required: false
        }
    ],
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model("Post", PostSchema);
export default Post;