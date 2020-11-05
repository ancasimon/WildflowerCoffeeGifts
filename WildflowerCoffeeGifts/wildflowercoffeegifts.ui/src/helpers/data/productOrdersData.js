import axios from 'axios';
import { baseUrl } from '../constants.json';

const postProductOrder = (newProductOrder) => axios.post(`${baseUrl}/lineitems`, newProductOrder);

export default { postProductOrder };
