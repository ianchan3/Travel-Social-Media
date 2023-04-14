import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';

export default function Posts() {
  const posts = useSelector((state) => state.postsReducer);
  const classes = useStyles();
  console.log(posts)
  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  )
}