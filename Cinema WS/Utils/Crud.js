const axios = require("axios");

const getAllItems = (url) => {
  return axios.get(url);
};

const getItem = (url, id) => {
  return axios.get(url + "/" + id); 
};

const createItem = (url, obj) => {
  return axios.post(url, obj);
};
const updateItem = (url, id, obj) => {
  delete obj._id;
  return axios.put(url + "/" + id, obj); 
};
const deleteItem = (url, id) => {
  return axios.delete(url + "/" + id);
};

module.exports = { getAllItems, getItem, createItem, updateItem, deleteItem };
