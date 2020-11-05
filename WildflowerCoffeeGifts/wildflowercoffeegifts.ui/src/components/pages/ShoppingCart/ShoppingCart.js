import React from 'react';
import { Table } from 'reactstrap';

import SingleLineItem from '../../shared/SingleLineItem/SingleLineItem';

import ordersData from '../../../helpers/data/ordersData';
import usersData from '../../../helpers/data/usersData';

import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: {},
    lineItems: [],
    user: {},
    userId: 1,
  }

  getCart = () => {
    const { cart, userId } = this.state;
    ordersData.getCart(userId)
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            cart: response.data,
            lineItems: response.data.lineItems,
          });
        } else {
          this.setState({
            cart: null,
            lineItems: [],
          });
        }
        console.error('response', response);
        console.error('current cart', this.state.cart);
      })
      .catch((error) => console.error('Unable to get the shopping cart.', error));
  }

  getUser = () => {
    const { userId } = this.state;
    usersData.getSingleUser(userId)
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => console.error('Unable to get user record.', error));
  }

  buildCartPage = () => {
    const { userId, cart } = this.state;
    this.getCart(userId);
    this.getUser(userId);
  }

  componentDidMount() {
    this.buildCartPage();
  }

  render() {
    const { cart, lineItems, user } = this.state;
    const buildLineItems = () => lineItems.map((item) => (
      <SingleLineItem key={item.Id} item={item} buildCartPage={this.buildCartPage} />
    ));

    return (
      <div>
          <h1>Your Shopping Cart</h1>
          <p>Here is your current order, {user.firstName}:</p>
          {
            (cart === null)
              ? <div>
              <p>Your cart is empty!</p>
              <p>Please go to the Products page and click Add to Cart on an item to get started!</p>
          </div>
              : <div>
              <h4>Total Price: ${cart.totalPrice}</h4>
              <h4>Items:</h4>
              <div>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price Per Unit</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove?</th>
                    </tr>
                  </thead>
                  {buildLineItems()}
                </Table>
              </div>
              </div>
          }
      </div>
    );
  }
}

export default ShoppingCart;
