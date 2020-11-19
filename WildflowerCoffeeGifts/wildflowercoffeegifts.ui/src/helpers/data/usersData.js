import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleUser = (userId) => axios.get(`${baseUrl}/users/${userId}`);
const getProfileUser = (id) => axios.get(`${baseUrl}/users/${id}/profile`);

export default { getAllUsers, getSingleUser, getProfileUser };
