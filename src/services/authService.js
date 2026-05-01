import api from './api';

export const login = (data) => api.post('/auth/login', data); //[cite: 1]
export const register = (data) => api.post('/auth/register', data); //[cite: 1]