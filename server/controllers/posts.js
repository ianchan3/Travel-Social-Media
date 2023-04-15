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

async function update (req, res) {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with that ID");

  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost)
}

export {index, create, update}