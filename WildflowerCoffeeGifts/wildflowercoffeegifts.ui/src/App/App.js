import React, { Component } from 'react';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../components/pages/Home/Home';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import Orders from '../components/pages/Orders/Orders';
import Products from '../components/pages/Products/Products';
import ShoppingCart from '../components/pages/ShoppingCart/ShoppingCart';
import SingleProductView from '../components/pages/SingleProductView/SingleProductView';

import ordersData from '../helpers/data/ordersData';

import './App.scss';

class App extends React.Component {
  state = {
    cart: {},
    userId: 1,
  }

  getCart = () => {
    const { cart, userId } = this.state;
    ordersData.getCart(userId)
      .then((response) => {
        this.setState({
          cart: response.data,
        });
      })
      .catch((error) => console.error('Unable to get the shopping cart.', error));
  }

  componentDidMount() {
    this.getCart(this.state.userId);
  }

  render() {
    const { cart } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/orders' component={Orders} />
                  <Route path='/products/:id' component={SingleProductView} cart={this.state.cart} />
                  <Route path='/products' component={Products} />
                  <Route path='/cart' component={ShoppingCart} cart={this.state.cart} />
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
