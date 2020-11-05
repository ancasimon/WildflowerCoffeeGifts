import axios from 'axios';
import { baseUrl } from '../constants.json';

const postProductOrder = (newProductOrder) => axios.post(`${baseUrl}/lineitems`, newProductOrder);

const updateProductOrder = (id, updatedProductOrder) => axios.put(`${baseUrl}/lineitems/withInfo/${id}`, updatedProductOrder);

export default { postProductOrder, updateProductOrder };
