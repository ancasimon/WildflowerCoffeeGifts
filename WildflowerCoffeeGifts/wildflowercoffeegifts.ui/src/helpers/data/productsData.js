import axios from 'axios';
import { baseUrl } from '../constants.json';

const getSingleProduct = (id) => axios.get(`${baseUrl}/products/${id}`);

const getSearchedProducts = (searchWord) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/products/search:${searchWord}`)
    .then((response) => {
      const products = response.data;
      resolve(products);
    })
    .catch((error) => reject(error));
});

export default { getSingleProduct, getSearchedProducts };
