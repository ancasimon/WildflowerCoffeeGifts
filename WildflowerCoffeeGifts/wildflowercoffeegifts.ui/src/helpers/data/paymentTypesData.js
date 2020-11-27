import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSinglePaymentType = (id) => axios.get(`${baseUrl}/paymentTypes/${id}`);

const getLatestPaymentTypeForUser = () => axios.get(`${baseUrl}/paymentTypes/latestByUid`);

const postPaymentType = (newPaymentType) => axios.post(`${baseUrl}/paymentTypes`, newPaymentType);

const getAllPaymentTypesByUserId = (userId) => axios.get(`${baseUrl}/paymentTypes/all/${userId}`);

const getAllPaymentTypesByUserUid = () => axios.get(`${baseUrl}/paymentTypes/allByUid`);

const updatePaymentType = (paymentTypeId, updatedPaymentType) => axios.put(`${baseUrl}/paymentTypes/${paymentTypeId}`, updatedPaymentType);

export default {
  getSinglePaymentType,
  postPaymentType,
  getLatestPaymentTypeForUser,
  getAllPaymentTypesByUserId,
  updatePaymentType,
  getAllPaymentTypesByUserUid,
};
