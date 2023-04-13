import Post from '../models/post.js';

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

export {index, create}