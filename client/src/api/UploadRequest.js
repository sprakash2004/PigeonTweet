import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);