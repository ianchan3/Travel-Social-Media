import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000' })

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}/likePost`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

