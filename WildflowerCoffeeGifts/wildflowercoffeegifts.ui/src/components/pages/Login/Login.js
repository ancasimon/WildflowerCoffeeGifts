import React from 'react';
import firebase from 'firebase';
// import { Link } from 'react-router-dom';
import './Login.scss';

import authRequests from '../../../helpers/data/authData';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      citystate: '',
      zipcode: '',
    },
  }

   loginClickEvent = (e) => {
     const { user } = this.state;
     e.preventDefault();
     authRequests
       .loginUser(user)
       .then(() => {
         this.props.history.push('/home');
       })
       .catch((error) => {
         console.error('there was an error in registering', error);
       });
   };

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .registerUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  logoutClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .logoutUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((error) => {
        console.error('there was an error logging out', error);
      });
  };

  streetAddressChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.streetAddress = e.target.value;
    this.setState({ user: tempUser });
  };

  cityChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.city = e.target.value;
    this.setState({ user: tempUser });
  };

  cityStateChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.cityState = e.target.value;
    this.setState({ user: tempUser });
  };

  zipcodeChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.zipcode = e.target.value;
    this.setState({ user: tempUser });
  };

  firstNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.firstName = e.target.value;
    this.setState({ user: tempUser });
  };

  lastNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.lastName = e.target.value;
    this.setState({ user: tempUser });
  };

  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="Login">
        <div className="box-container">
          <h1 className="text-center"><em>Welcome</em></h1>
        <div id="login-form">
          <form className="form-horizontal col-sm-12 col-sm-offset-3">
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Please enter email"
                  value={this.state.user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-4 control-label">
                Password:
              </label>
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Please enter password"
                  value={this.state.user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="btn container">
              <div>
                <button m-5px
                  type="submit"
                  className="btn btn-outline-dark wcgButton"
                  onClick={this.loginClickEvent}
                >
                  Log In
                </button>
                 <button
                  type="submit"
                  className="btn btn-outline-dark wcgButton"
                  onClick={this.logoutClickEvent}
                >
                  Log Out
                </button>
              </div>
            </div>
          <h6>Need to Register?</h6>
          <div className="form-group">
              <label htmlFor="inputFirstName" className="col-sm-4 control-label">
                FirstName:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirstName"
                  placeholder="Please enter first name"
                  value={this.state.user.firstName}
                  onChange={this.firstNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputLastName" className="col-sm-4 control-label">
                LastName:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  placeholder="Please enter last name"
                  value={this.state.user.lastName}
                  onChange={this.lastNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputStreetAddress" className="col-sm-4 control-label">
                Street Address:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputStreetAddress"
                  placeholder="Please enter street address"
                  value={this.state.user.streetAddress}
                  onChange={this.streetAddressChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputcity" className="col-sm-4 control-label">
                City:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputcity"
                  placeholder="Please enter city"
                  value={this.state.user.city}
                  onChange={this.cityChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputcityState" className="col-sm-4 control-label">
                CityState:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputcityState"
                  placeholder="Please enter state"
                  value={this.state.user.cityState}
                  onChange={this.cityStateChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputzipcode" className="col-sm-4 control-label">
                ZipCode:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputzipcode"
                  placeholder="Please enter zipcode"
                  value={this.state.user.zipcode}
                  onChange={this.zipcodeChange}
                />
              </div>
            </div>
            <div className="form-group mt-15px">
              <div>
                <button
                  className="btn btn-primary text-center"
                  onClick={this.registerClickEvent}>
                  SignUp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

export default Login;
