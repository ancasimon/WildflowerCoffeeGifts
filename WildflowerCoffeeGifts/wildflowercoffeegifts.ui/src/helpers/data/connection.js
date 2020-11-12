import firebase from 'firebase';
import constants from '../constants.json';

const firebaseApp = () => {
  firebase.initializeApp(constants.firebaseConfig);
};

export default firebaseApp;
