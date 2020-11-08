import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSinglePaymentType = (id) => axios.get(`${baseUrl}/paymentTypes/${id}`);

const postPaymentType = (newPaymentType) => axios.post(`${baseUrl}/paymentTypes`, newPaymentType);

export default { getSinglePaymentType, postPaymentType };
