// services/gameService.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/', // Usando a raiz do servidor
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getGames() {
    return apiClient.get('/calendar.json');
  }
};
