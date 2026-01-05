import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const getProducts = () => axios.get(API_URL);
export const addProduct = (data) => axios.post(API_URL, data);
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
export const getByCategory = (category) => axios.get(`${API_URL}/category/${category}`);
export const getCategories = () => axios.get(`${API_URL}/categories`);