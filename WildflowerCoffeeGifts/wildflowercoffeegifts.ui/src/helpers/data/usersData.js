import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleUser = (userId) => axios.get(`${baseUrl}/users/${userId}`);

const updateUser = (userId, updatedUser) => axios.put(`${baseUrl}/users/${userId}`, updatedUser);

export default { getSingleUser, updateUser };
