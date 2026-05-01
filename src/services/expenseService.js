import api from './api';

export const createExpense = (data) => api.post('/expense/create', data); //[cite: 1]
// export const getExpenses = (page = 0, size = 50) => api.get(`/expense/getAll?page=${page}&size=${size}`); //[cite: 1]
export const getExpenseById = (id) => api.get(`/expense/getById/${id}`); //[cite: 1]
export const updateExpense = (id, data) => api.put(`/expense/${id}`, data); //[cite: 1]

// src/services/expenseService.js
export const getExpenses = (page = 0, size = 5, sortBy = 'date', direction = 'desc') => {
  return api.get(`/expense/getAll`, {
    params: {
      page,
      size,
      sort: `${sortBy},${direction}` // Example: "date,desc"
    }
  });
};