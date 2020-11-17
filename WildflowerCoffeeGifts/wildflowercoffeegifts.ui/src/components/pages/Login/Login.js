import React from 'react';
// import { Link } from 'react-router-dom';
import './Login.scss';

import authRequests from '../../../helpers/data/authData';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

register = (email, password) => authRequests.registerUser(email, password)

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
        <div id="login-form">

          <form className="form-horizontal col-sm-12 col-sm-offset-3">
          <div className="form-group">
              <div>
                <button
                  type="submit"
                  className="btn btn-outline-dark"
                  onClick={this.loginClickEvent}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email:
              </label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
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
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => this.register(user.email, user.password)}
                >
                  Need to Register?
                </button>
              </div>
            </div>
            <div className="form-group">
              <div>
                <button
                  type="submit"
                  className="btn btn-outline-dark"
                  onClick={this.logoutClickEvent}
                >
                  LogOut
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
