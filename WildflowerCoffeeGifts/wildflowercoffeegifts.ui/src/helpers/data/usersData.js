import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users`)
    .then((response) => {
      const fbUsers = response.data;
      const users = [];
      if (fbUsers) {
        Object.keys(fbUsers).forEach((fbId) => {
          fbUsers[fbId].id = fbId;
          users.push(fbUsers[fbId]);
        });
      }
      resolve(users);
    })
    .catch((error) => reject(error));
});

const getSingleUser = (userId) => axios.get(`${baseUrl}/users/${userId}`);

const getSingleUserIdByUid = (uid) => axios.get(`${baseUrl}/users/uid/${uid}`);

const getProfileUser = (id) => axios.get(`${baseUrl}/users/${id}/profile`);

const updateUser = (userId, updatedUser) => axios.put(`${baseUrl}/users/${userId}`, updatedUser);

export default {
  getAllUsers,
  getSingleUser,
  getProfileUser,
  updateUser,
  getSingleUserIdByUid,
};
