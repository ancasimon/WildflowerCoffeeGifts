import React, { Component } from 'react';
import usersData from '../../../helpers/data/usersData';

class Profile extends Component {
  state = { users: [] };

  componentDidMount() {
    usersData.getAllUsers()
      .then((users) => {
        this.setState({ users });
      });
  }

  render() {
    const { users } = this.state;
    const buildUserProfile = users.map((user) => (
      <div className="container" key={user.id}>
        <div>
    <p>{user.firstName} {user.lastName}</p>
         </div>
      </div>
    ));
    return (
      <div>
        <h1>Profile Page</h1>
        {buildUserProfile}
      </div>
    );
  }
}

export default Profile;
