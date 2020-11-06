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

import './App.scss';
import SingleProductTheme from '../components/shared/SingleProductTheme/SingleProductTheme';

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
                  <Route path='/orders' component={Orders} />
                  <Route path='/products/:id' component={SingleProductView} />
                  <Route path='/products' component={Products} />
                  <Route path='/cart' component={ShoppingCart} />
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
