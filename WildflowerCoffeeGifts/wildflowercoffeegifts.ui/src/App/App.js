import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import Login from '../components/pages/Login/Login';
import Profile from '../components/pages/Profile/Profile';
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
                 <Route path='/login' component={Login}></Route>
                 <Route path='/profile' component={Profile}></Route>
                  <Route path='/cart' component={ShoppingCart} />
                  <Route path='/orders' component={Orders} />
                  <Route path='/products/search/:searchWord' component={SearchedProducts} />
                  <Route path='/products/:id' component={SingleProductView} />
                  <Route path='/products' component={Products} />
                  <Route path='/' component={Home} />
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
