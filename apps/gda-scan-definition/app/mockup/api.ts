
import axios from 'axios';

// const url = process.env.BLUEAPI_URL
const url = "https://i22-blueapi.diamond.ac.uk"

const api = axios.create({
  baseURL: url
});

export default api;
