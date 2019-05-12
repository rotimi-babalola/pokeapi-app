import axios from 'axios';
import { API_URL } from '../constants';

const apiURL = API_URL;

const instance = axios.create({
  baseURL: apiURL,
});

export default instance;
