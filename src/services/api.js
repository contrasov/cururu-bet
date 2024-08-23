import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://site.api.espn.com/apis/site/v2/sports/basketball/wnba',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const secondApiData = axios.create({
  baseURL: 'https://cdn.espn.com/core/wnba/scoreboard?xhr=1&limit=50',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const scheduleApiData = axios.create({
  baseURL: 'https://cdn.espn.com/core/wnba/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})


export default {
  getScoreboard() {
    return apiClient.get('/scoreboard');
  },

  getEventDetails(eventId) {
    return apiClient.get(`/scoreboard/${eventId}`);
  },

  getSecondApiData(eventId) {
    return secondApiData.get(`/events/${eventId}`);
  },

  getScheduleApiData() {
    return scheduleApiData.get(`schedule?xhr=1&year=2024&week=1`)
  }
};
