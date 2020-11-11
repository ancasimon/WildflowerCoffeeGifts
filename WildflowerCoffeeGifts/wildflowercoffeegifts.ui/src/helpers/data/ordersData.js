import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleOrder = (id) => axios.get(`${baseUrl}/orders/${id}`);

const getCart = (userId) => axios.get(`${baseUrl}/orders/cart/${userId}`);

const postOrder = (newOrder) => axios.post(`${baseUrl}/orders`, newOrder);

const createCart = (userId) => axios.post(`${baseUrl}/orders/cart/${userId}`, userId);

export default {
  getSingleOrder,
  postOrder,
  getCart,
  createCart,
};
