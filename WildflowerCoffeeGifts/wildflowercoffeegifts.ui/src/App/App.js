import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import Login from '../components/pages/Login/Login';
import Profile from '../components/Profile/Profile';

import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import Orders from '../components/pages/Orders/Orders';
import Products from '../components/pages/Products/Products';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import SingleProductView from '../components/pages/SingleProductView/SingleProductView';
import SearchedProducts from '../components/pages/SearchedProducts/SearchedProducts';
// import ordersData from '../helpers/data/ordersData';
import './App.scss';

fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/login' component={Login} authed={authed}></Route>
                  <PrivateRoute path='/profile' component={Profile} authed={authed} />
                  <PrivateRoute path='/cart' component={ShoppingCart} authed={authed} />
                  <PrivateRoute path='/orders' component={Orders} authed={authed} />
                  <Route path='/products/search/:searchWord' component={SearchedProducts} authed={authed} />
                  <Route path='/products/:id' component={SingleProductView} authed={authed} />
                  <Route path='/products' component={Products} authed={authed} />
                  <Route path='/home' component={Home} authed={authed} />

                  <Redirect from='*' to='/home' />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
