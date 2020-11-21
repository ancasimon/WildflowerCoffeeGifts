import React, { Component } from 'react';
import firebase from 'firebase';
import usersData from '../../helpers/data/usersData';
import './Profile.scss';

class Profile extends Component {
  state = {
    id: [],
    lastName: [],
    firstName: [],
    email: [],
    address: [],
    city: [],
    phoneNumber: [],
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const emailUser = firebase.auth().currentUser.email;
        console.error('alluser', emailUser);
        usersData.getAllUsers()
          .then((response) => response.filter((x) => x.email === emailUser))
          .then((id) => {
            console.error('lastid', id);
            this.setState({ id: id[0].id });
            this.setState({ lastName: id[0].lastName });
            this.setState({ firstName: id[0].firstName });
            this.setState({ email: id[0].email });
            this.setState({ address: id[0].address });
            this.setState({ city: id[0].city });
            this.setState({ phoneNumber: id[0].phoneNumber });
          });
      }
    });
  }

  render() {
    const {
      id, lastName, firstName, email, address, city, phoneNumber,
    } = this.state;
    console.error('myId', id);
    return (
      <div className="box-container">
        ,<h1 className="text-center"><i class="fas fa-users"></i></h1>
          <h2 className="text-center"><em>{firstName} {lastName}</em></h2>
          <p className="mr-auto"><i class="fas fa-envelope-open-text"></i> {email}</p>
          <p className="mr-auto"><i class="fas fa-map-marker-alt"></i> {address} {city}</p>
          <p className="mr-auto"><i class="fas fa-phone-square-alt"></i> {phoneNumber}</p>
           </div>
    );
  }
}

export default Profile;
