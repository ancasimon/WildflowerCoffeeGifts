import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleProduct = (id) => axios.get(`${baseUrl}/products/${id}`);

export default { getSingleProduct };
