import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

let instance = axios.create(defaultOptions);

export default instance;
