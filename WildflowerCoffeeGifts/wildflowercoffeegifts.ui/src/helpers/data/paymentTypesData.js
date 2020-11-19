import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSinglePaymentType = (id) => axios.get(`${baseUrl}/paymentTypes/${id}`);

const getLatestPaymentTypeForUser = (userId) => axios.get(`${baseUrl}/paymentTypes/latest/${userId}`);

const postPaymentType = (newPaymentType) => axios.post(`${baseUrl}/paymentTypes`, newPaymentType);

const getAllPaymentTypesByUserId = (userId) => axios.get(`${baseUrl}/paymentTypes/all/${userId}`);

export default {
  getSinglePaymentType,
  postPaymentType,
  getLatestPaymentTypeForUser,
  getAllPaymentTypesByUserId,
};
