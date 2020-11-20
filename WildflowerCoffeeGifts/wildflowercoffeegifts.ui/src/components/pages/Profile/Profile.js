import React, { Component } from 'react';
import firebase from 'firebase';
import usersData from '../../../helpers/data/usersData';
import './Profile.scss';

class Profile extends Component {
  state = {
    uid: [],
    lastName: [],
    firstName: [],
    email: [],
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uidUser = firebase.auth().currentUser.uid;
        console.error('myuser', uidUser);
        usersData.getAllUsers()
          .then((response) => response.filter((x) => x.uid === uidUser))
          .then((uid) => {
            this.setState({ uid: uid[0].uid });
            this.setState({ lastName: uid[0].lastName });
            this.setState({ firstName: uid[0].firstName });
            this.setState({ email: uid[0].email });
          });
      }
    });
  }

  render() {
    const {
      uid, lastName, firstName, email,
    } = this.state;
    console.error('myId', uid);
    return (
      <div className="box-container">
        ,<h1 className="text-center"><i class="fas fa-users"></i></h1>
          <h2 className="text-center"><em>{firstName} {lastName}</em></h2>
          <p className="text-center"><i class="fas fa-envelope-open-text"></i> {email}</p>
          <p className="text-center"><i class="far fa-id-card"></i> Account Number:  {uid}</p>
           </div>
    );
  }
}

export default Profile;
