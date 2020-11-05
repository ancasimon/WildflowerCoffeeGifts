import axios from 'axios';
import { baseUrl } from '../constants.json';

const GetAllProductThemesByStatus = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/themes/counttheme`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getThemeThreeProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/themes/topthree`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getSingleThemeProducts = (id) => axios.get(`${baseUrl}/products/${id}}`);

export default {
  GetAllProductThemesByStatus,
  getThemeThreeProducts,
  getSingleThemeProducts,
};
