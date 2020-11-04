import axios from 'axios';
import { baseUrl } from '../constants.json';

const GetAllProductThemesByStatus = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/themes/counttheme`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default { GetAllProductThemesByStatus };
