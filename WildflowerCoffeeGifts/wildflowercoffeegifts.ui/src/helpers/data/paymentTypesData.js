import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSinglePaymentType = (id) => axios.get(`${baseUrl}/paymentTypes/${id}`);

const getLatestPaymentTypeForUser = (userId) => axios.get(`${baseUrl}/paymentTypes/latest/${userId}`);

const postPaymentType = (newPaymentType) => axios.post(`${baseUrl}/paymentTypes`, newPaymentType);

const getAllPaymentTypesByUserId = (userId) => axios.get(`${baseUrl}/paymentTypes/all/${userId}`);

const getAllPaymentTypesByUserUid = (uid) => axios.get(`${baseUrl}/paymentTypes/all/${uid}`);

const updatePaymentType = (paymentTypeId, updatedPaymentType) => axios.put(`${baseUrl}/paymentTypes/${paymentTypeId}`, updatedPaymentType);

export default {
  getSinglePaymentType,
  postPaymentType,
  getLatestPaymentTypeForUser,
  getAllPaymentTypesByUserId,
  updatePaymentType,
  getAllPaymentTypesByUserUid,
};
