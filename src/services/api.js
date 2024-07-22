import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://site.api.espn.com/apis/site/v2/sports/basketball/wnba',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getScoreboard() {
    return apiClient.get('/scoreboard');
  }
};
