import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleOrder = (id) => axios.get(`${baseUrl}/orders/${id}`);

const getCart = (uid) => axios.get(`${baseUrl}/orders/cart/uid/${uid}`);

const postOrder = (newOrder) => axios.post(`${baseUrl}/orders`, newOrder);

const createCart = (uid) => axios.post(`${baseUrl}/orders/cart/uid/${uid}`);

const updateOrder = (orderId, updatedOrder) => axios.put(`${baseUrl}/orders/${orderId}`, updatedOrder);

const viewAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/orders/history`)
    .then((response) => {
      console.error('from ordersData', response.data);
      resolve(response.data);
    })
    .catch((error) => reject(error, 'unable to get orderData from API'));
});

export default {
  getSingleOrder,
  postOrder,
  getCart,
  createCart,
  updateOrder,
  viewAllOrders,
};
