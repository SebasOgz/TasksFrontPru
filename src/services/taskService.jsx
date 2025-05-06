import axios from "axios";

const BASE_URL = "https://pruebatec-n9w8.onrender.com/api/tasks";

export const getTasks = async () => {
  const res = await axios.get(`${BASE_URL}/view`);
  return res.data; 
};

export const createTask = async (task) => {
  const res = await axios.post(`${BASE_URL}/create`, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${BASE_URL}/update/${id}`, task);
  return res.data;
};

export default {
  getTasks,
  createTask,
  updateTask,
};
