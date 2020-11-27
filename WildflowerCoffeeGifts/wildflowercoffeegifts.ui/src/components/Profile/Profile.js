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
    stateId: [],
    phoneNumber: [],
    stateName: '',
    allStates: [
      { id: 0, value: 'Alabama' },
      { id: 1, value: 'Alaska' },
      { id: 2, value: 'Arizona' },
      { id: 3, value: 'Arkansas' },
      { id: 4, value: 'California' },
      { id: 5, value: 'Colorado' },
      { id: 6, value: 'Connecticut' },
      { id: 7, value: 'Delaware' },
      { id: 8, value: 'District Of Columbia' },
      { id: 9, value: 'Florida' },
      { id: 10, value: 'Georgia' },
      { id: 11, value: 'Hawaii' },
      { id: 12, value: 'Idaho' },
      { id: 13, value: 'Illinois' },
      { id: 14, value: 'Indiana' },
      { id: 15, value: 'Iowa' },
      { id: 16, value: 'Kansas' },
      { id: 17, value: 'Kentucky' },
      { id: 18, value: 'Louisiana' },
      { id: 19, value: 'Maine' },
      { id: 20, value: 'Maryland' },
      { id: 21, value: 'Massachusetts' },
      { id: 22, value: 'Michigan' },
      { id: 23, value: 'Minnesota' },
      { id: 24, value: 'Mississippi' },
      { id: 25, value: 'Missouri' },
      { id: 26, value: 'Montana' },
      { id: 27, value: 'Nebraska' },
      { id: 28, value: 'Nevada' },
      { id: 29, value: 'New Hampshire' },
      { id: 30, value: 'New Jersey' },
      { id: 31, value: 'New Mexico' },
      { id: 32, value: 'New York' },
      { id: 33, value: 'North Carolina' },
      { id: 34, value: 'North Dakota' },
      { id: 35, value: 'Ohio' },
      { id: 36, value: 'Oklahoma' },
      { id: 37, value: 'Oregon' },
      { id: 38, value: 'Pennsylvania' },
      { id: 39, value: 'Rhode Island' },
      { id: 40, value: 'South Carolina' },
      { id: 41, value: 'South Dakota' },
      { id: 42, value: 'Tennessee' },
      { id: 43, value: 'Texas' },
      { id: 44, value: 'Utah' },
      { id: 45, value: 'Vermont' },
      { id: 46, value: 'Virginia' },
      { id: 47, value: 'Washington' },
      { id: 48, value: 'West Virginia' },
      { id: 49, value: 'Wisconsin' },
      { id: 50, value: 'Wyoming' },
    ],
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
            this.setState({ stateId: id[0].usState });
            this.setState({ phoneNumber: id[0].phoneNumber });
            const selectedState = this.state.allStates.find((element) => element.id === this.state.stateId);
            this.setState({ stateName: selectedState.value });
            console.error('state name', this.state.stateName);
          });
      }
    });
  }

  render() {
    const {
      id, lastName, firstName, email, address, city, phoneNumber, stateName,
    } = this.state;
    console.error('myId', id);
    return (
      <div className="box-container">
        ,<h1 className="text-center"><i class="fas fa-users"></i></h1>
          <h2 className="text-center"><em>{firstName} {lastName}</em></h2>
          <p className="mr-auto"><i class="fas fa-envelope-open-text"></i> {email}</p>
          <p className="mr-auto"><i class="fas fa-map-marker-alt"></i> {address} {city} {stateName}</p>
          <p className="mr-auto"><i class="fas fa-phone-square-alt"></i> {phoneNumber}</p>
           </div>
    );
  }
}

export default Profile;
