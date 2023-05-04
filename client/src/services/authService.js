import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000' })

export const logIn = (formData) => API.post('/users/login', formData);
export const signUp = (formData) => API.post('/users/signup', formData);