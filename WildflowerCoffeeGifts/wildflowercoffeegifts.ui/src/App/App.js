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
import SearchedProducts from '../components/pages/SearchedProducts/SearchedProducts';

import ordersData from '../helpers/data/ordersData';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path='/cart' component={ShoppingCart} />
                  <Route path='/orders' component={Orders} />
                  <Route path='/products/:id' component={SingleProductView} />
                  <Route path='/products' component={Products} />
                  <Route path='/search' component={SearchedProducts} />
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
