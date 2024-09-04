import axios from "axios";

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://mighty-brushlands-85114-cdad31a2996b.herokuapp.com/api/items/',
});


export const getItems = () => api.get('/items/');
export const getItem = (id) => api.get(`/items/${id}/`);
export const createItem = (item) => api.post('/items/', item);
export const updateItem = (id, item) => api.put(`/items/${id}/`, item);
export const partialUpdateItem = (id, item) => api.patch(`/items/${id}/`, item);
export const deleteItem = (id) => api.delete(`/items/${id}/`);

export default api;
