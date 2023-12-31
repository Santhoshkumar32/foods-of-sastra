import express from 'express';
import mongoose from 'mongoose';
import postMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req,res) => {

  try{
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  }catch( error )
  {
     res.status(404).json({ message : error.message });
  }

}

export const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await postMessage.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createPost= async (req,res) => {
  const post = req.body;
    const newPost= new postMessage({...post,creator: req.userId,createdAt:new Date().toISOString()});


    try{
          await newPost.save();
          res.status(201).json(newPost);
    } catch(error)
    {
        res.status(409).json({ message : error});
    }

}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message,canteen, creator, selectedFile, tags,likes,rating } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title,canteen,likes,rating, message, tags, selectedFile, _id: id,createdAt:new Date().toISOString() };

  await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await postMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if(!req.userId) return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await postMessage.findById(id);

  const index= post.likes.findIndex((id)=> id===String(req.userId));

  if(index===-1)
  {
    post.likes.push(req.userId);
  } else {
   post.likes= post.likes.filter((id)=> id!==String(req.userId));
  }

  const updatedPost = await postMessage.findByIdAndUpdate(id,post , { new: true });
  
  res.status(200).json(updatedPost);
}

export default router;