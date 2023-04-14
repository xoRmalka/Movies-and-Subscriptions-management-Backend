const axios = require("axios");

const getAllItems = (url) => {
  return axios.get(url);
};

const getItem = (url, id) => {
  return axios.get(url + "/" + id); // url/id
};

const createItem = (url, obj) => {
  return axios.post(url, obj);
};
const updateItem = (url, id, obj) => {
  delete obj._id;
  return axios.put(url + "/" + id, obj); // 1st param: url/id, 2nd param: obj
};
const deleteItem = (url, id) => {
  return axios.delete(url + "/" + id); // 1st param: url/id
};

module.exports = { getAllItems, getItem, createItem, updateItem, deleteItem };
