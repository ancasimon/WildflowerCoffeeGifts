import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleOrder = (id) => axios.get(`${baseUrl}/orders/${id}`);

const postOrder = (newOrder) => axios.post(`${baseUrl}/orders`, newOrder);

export default { getSingleOrder, postOrder };
