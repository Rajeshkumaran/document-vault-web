import axios from 'axios';

console.log('Debugger process', process.env.NEXT_PUBLIC_API_URL);
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
