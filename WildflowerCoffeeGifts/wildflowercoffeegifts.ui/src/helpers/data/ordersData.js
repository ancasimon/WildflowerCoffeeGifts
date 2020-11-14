import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleOrder = (id) => axios.get(`${baseUrl}/orders/${id}`);

const getCart = (userId) => axios.get(`${baseUrl}/orders/cart/${userId}`);

const postOrder = (newOrder) => axios.post(`${baseUrl}/orders`, newOrder);

const createCart = (userId) => axios.post(`${baseUrl}/orders/cart/${userId}`, userId);

const viewAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders/history`)
    .then((response) => {
      resolve(response.data);
      console.error(response.data);
    })
    .catch((error) => reject(error));
});

export default {
  getSingleOrder,
  postOrder,
  getCart,
  createCart,
  viewAllOrders,
};
