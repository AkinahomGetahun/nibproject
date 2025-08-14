import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  withCredentials: true,
  headers: {
   'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Authorization': ` Bearer ${22|aP08gjiuSAGPnORlSb8OXUB3G83B5GuQ7bX2XhLX13a0a59e}`,
  },
});

export default api;
