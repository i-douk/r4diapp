import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

