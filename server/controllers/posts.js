import Post from '../models/post.js';

import mongoose from 'mongoose';

async function index (req, res) {
  try {
    const post =  await Post.find();
    console.log(post)
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

async function create (req, res) {
  const post = req.body;
  const newPost = new Post(post)
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function update (req, res) {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that ID");

  const updatedPost = await Post.findByIdAndUpdate(id, { ...post, id}, { new: true });
  res.json(updatedPost)
}

async function deletePost (req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that ID");
  await Post.findByIdAndRemove(id);
  console.log("POST DELETED");
  res.json({ message: 'Post deleted successfully' })
}

async function likePost (req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that ID");
  const post = await Post.findById(id);
  const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true } )
  res.json(updatedPost);
}

export {index, create, update, deletePost, likePost}