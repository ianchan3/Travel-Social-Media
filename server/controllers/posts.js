import Post from '../models/post.js';

import mongoose from 'mongoose';

async function index (req, res) {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex =(Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await Post.countDocuments({})
    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);    
    res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

async function getPost (req,res) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function getPostsBySearch (req, res) {

  const { searchQuery, tags } = req.query;

  try {
      const title = new RegExp(searchQuery, "i");
      // the letter i will match all forms of upper/lowercase combinations

      const posts = await Post.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

      res.json({ data: posts });
  } catch (error) {    
      res.status(404).json({ message: error.message });
  }
}

async function create (req, res) {
  const post = req.body;
  const newPost = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
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

  if(!req.userId) return res.json({ message: 'Not Authenticated' })

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with that ID");
  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true } )
  res.json(updatedPost);
}

async function commentPost (req, res) {
  const { id } = req.params;
  const { value } = req.body;

  const post = await Post.findById(id);
  post.comments.push(value);

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
}

export {index, create, update, deletePost, likePost, getPostsBySearch, getPost, commentPost}