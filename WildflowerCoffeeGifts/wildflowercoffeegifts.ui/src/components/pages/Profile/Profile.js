import React, { Component } from 'react';
import firebase from 'firebase';
import usersData from '../../../helpers/data/usersData';

class Profile extends Component {
  state = { id: '' };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const emailUser = firebase.auth().currentUser.email;
        usersData.getAllUsers()
          .then((response) => response.filter((x) => x.email === emailUser))
          .then((id) => {
            this.setState({ id });
          });
      }
    });
  }

  render() {
    const { id } = this.state;
    console.error('inmystate', id);
          <div className="container" key={id}>
             <p>{id.firstName} {id.lastName}</p>
      </div>;
          return (
      <div>
        <h1>Profile Page</h1>
        <p>{id.firstName} {id.lastName}</p>

      </div>
          );
  }
}

export default Profile;
