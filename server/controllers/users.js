import User from '../models/user.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

async function login (req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist." })

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

async function signup (req, res) {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    if (password.length < 6) return res.status(400).json({ message: "Password less than 6 characters"})


    if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET, { expiresIn: '1h' });

    res.status(200).json({ result, token })

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
}


export { login, signup }