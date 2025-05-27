import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/' });

export const logIn = (formData) => API.post('/auth/login', formData); 

// export const signUp = (formData) => API.post('/auth/register', formData);
export const signUp = (formData) => {
    console.log("AuthRequest Payload:", formData); // Add this line
    return API.post('/auth/register', formData);
};
// export const signUp = async (formData) => {
//     // Add console.log to debug the data being sent
//     console.log('Sending signup data:', formData);
//     return API.post('/auth/register', formData);
// };