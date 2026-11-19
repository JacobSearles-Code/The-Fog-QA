import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
});

export const getSeverityData = () =>
    API.get('/analytics/severity');

export const getStatusData = () =>
    API.get('/analytics/status');

export const getGameData = () =>
    API.get('/analytics/games');

export const getPlatformData = () =>
    API.get('/analytics/platforms');

export const getReportsOverTime = () =>
    API.get('/analytics/reports-over-time');

export const getResolvedOverTime = () =>
    API.get('/analytics/resolved-over-time');

export const getTesterData = () =>
    API.get('/analytics/testers');

export const getCommentData = () =>
    API.get('/analytics/comments-per-report');
