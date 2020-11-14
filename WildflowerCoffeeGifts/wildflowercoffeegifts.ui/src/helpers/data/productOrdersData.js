import axios from 'axios';
import { baseUrl } from '../constants.json';

const postProductOrder = (newProductOrder) => axios.post(`${baseUrl}/lineitems`, newProductOrder);

const updateProductOrder = (id, updatedProductOrder) => axios.put(`${baseUrl}/lineitems/withInfo/${id}`, updatedProductOrder);

const postProductOrderBasedOnProductAndOrderIds = (productId, orderId, qty) => axios.post(`${baseUrl}/lineitems/${productId}/${orderId}/${qty}`);

const updateProductOrderBasedOnProductAndOrderIds = (productId, orderId, newQuantity) => axios.put(`${baseUrl}/lineitems/${productId}/${orderId}/${newQuantity}`);

export default {
  postProductOrder,
  updateProductOrder,
  postProductOrderBasedOnProductAndOrderIds,
  updateProductOrderBasedOnProductAndOrderIds,
};
