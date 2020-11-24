import React from 'react';
import firebase from 'firebase';

import PropTypes from 'prop-types';

// import { Link } from 'react-router-dom';
import './Login.scss';

import authRequests from '../../../helpers/data/authData';

class Login extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      usState: '',
      zipcode: '',
      phoneNumber: '',
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

 addressChange = (e) => {
   const tempUser = { ...this.state.user };
   tempUser.address = e.target.value;
   this.setState({ user: tempUser });
 };

  cityChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.city = e.target.value;
    this.setState({ user: tempUser });
  };

    stateChange = (e) => {
      const tempUser = { ...this.state.user };
      tempUser.usState = e.target.value;
      this.setState({ user: tempUser });
    };

    zipcodeChange = (e) => {
      const tempUser = { ...this.state.user };
      tempUser.zipcode = e.target.value;
      this.setState({ user: tempUser });
    };

    phoneChange = (e) => {
      const tempUser = { ...this.state.user };
      tempUser.phoneNumber = e.target.value;
      this.setState({ user: tempUser });
    };

    render() {
      const { user } = this.state;
      const { authed } = this.props;
      console.error('authed on login??', this.props.authed);

      const buildLogButtons = () => {
        if (authed) {
          return (
          <div className="btn container">
            <button
              type="submit"
              className="btn btn-outline-dark wcgButton"
              onClick={this.logoutClickEvent}
            >
              Log Out
            </button>
          </div>
          );
        }
        return (
        <div className="btn container">
          <div>
            <button m-5px
              type="submit"
              className="btn btn-outline-dark wcgButton"
              onClick={this.loginClickEvent}
            >
              Log In
            </button>
          </div>
          <div>
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
              <label htmlFor="inputAddress" className="col-sm-4 control-label">
                Street Address:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Please enter street address."
                  value={this.state.user.address}
                  onChange={this.addressChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCity" className="col-sm-4 control-label">
               City:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="Please enter city"
                  value={this.state.user.city}
                  onChange={this.cityChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputUsState" className="col-sm-4 control-label">
                State:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsState"
                  placeholder="Please enter state"
                  value={this.state.user.state}
                  onChange={this.stateChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputZipCode" className="col-sm-4 control-label">
               Zipcode:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputZipCode"
                  placeholder="Please enter zipcode"
                  value={this.state.user.zipcode}
                  onChange={this.zipcodeChange}
                />
              </div>
            </div>
              <div className="form-group">
              <label htmlFor="inputPhone" className="col-sm-4 control-label">
                Phone Number:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="inputPhone"
                  placeholder="Please enter phone number"
                  value={this.state.user.phoneNumber}
                  onChange={this.phoneChange}
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
          </div>
          </div>
        );
      };
      return (
      <div className="Login" {...this.props}>
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

            {buildLogButtons()}
          </form>
        </div>
      </div>
      </div>
      );
    }
}

export default Login;
