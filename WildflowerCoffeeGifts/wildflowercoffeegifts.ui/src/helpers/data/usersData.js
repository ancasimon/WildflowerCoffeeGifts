import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleUser = (userId) => axios.get(`${baseUrl}/users/${userId}`);

export default { getSingleUser };
