import React, { Component } from 'react';
import firebase from 'firebase';
import usersData from '../../../helpers/data/usersData';
import './Profile.scss';

class Profile extends Component {
  state = {
    id: [],
    lastName: [],
    firstName: [],
    email: [],
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const emailUser = firebase.auth().currentUser.email;
        usersData.getAllUsers()
          .then((response) => response.filter((x) => x.email === emailUser))
          .then((id) => {
            this.setState({ id: id[0].id });
            this.setState({ lastName: id[0].lastName });
            this.setState({ firstName: id[0].firstName });
            this.setState({ email: id[0].email });
          });
      }
    });
  }

  render() {
    const {
      id, lastName, firstName, email,
    } = this.state;
    console.error('myId', id);
    return (
      <div className="box-container">
        ,<h1 className="text-center"><i class="fas fa-users"></i></h1>
          <h2 className="text-center"><em>{firstName} {lastName}</em></h2>
          <p className="text-center"><i class="fas fa-envelope-open-text"></i> {email}</p>
          <p className="text-center"><i class="far fa-id-card"></i> Account Number:  {id}</p>
           </div>
    );
  }
}

export default Profile;
