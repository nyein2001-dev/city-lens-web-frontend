import axios from "axios";

const api = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://mighty-brushlands-85114-cdad31a2996b.herokuapp.com/api/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const getItems = () => api.get("/items/items/");
export const getItem = (id) => api.get(`/items/items/${id}/`);
export const createItem = (item) => api.post("/items/items/", item);
export const updateItem = (id, item) => api.put(`/items/items/${id}/`, item);
export const partialUpdateItem = (id, item) =>
  api.patch(`/items/items/${id}/`, item);
export const deleteItem = (id) => api.delete(`/items/items/${id}/`);

export const getRoutes = () =>
  api.get("/dashboard/routes/?cur_page=1&page_size=10");

export default api;
