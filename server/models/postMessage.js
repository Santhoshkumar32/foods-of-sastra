import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        title: String,
        canteen: String,
        message: String,
        name: String,
        creator: String,
        tags: [String],
        selectedFile: String,
        likes: {
            type: [String],
            default: []
        },
        rating: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    }
);

const postMessage= mongoose.model('postMessage', postSchema);

export default postMessage;