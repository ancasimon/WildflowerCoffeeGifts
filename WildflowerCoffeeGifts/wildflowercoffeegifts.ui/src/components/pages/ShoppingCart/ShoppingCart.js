import React from 'react';
import { Table } from 'reactstrap';

import SingleLineItem from '../../shared/SingleLineItem/SingleLineItem';

import ordersData from '../../../helpers/data/ordersData';

import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: {},
    lineItems: [],
    userId: 2,
  }

  getCart = () => {
    const { cart, userId } = this.state;
    ordersData.getCart(userId)
      .then((response) => {
        this.setState({
          cart: response.data,
          lineItems: response.data.lineItems,
        });
        console.error('current cart', this.state.cart);
      })
      .catch((error) => console.error('Unable to get the shopping cart.', error));
  }

  componentDidMount() {
    this.getCart(this.state.userId);
  }

  render() {
    const { cart, lineItems } = this.state;
    const buildLineItems = () => lineItems.map((item) => (
        <SingleLineItem key={item.Id} item={item} />
    ));

    return (
      <div>
          <h1>Your Shopping Cart</h1>
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
                </tr>
              </thead>
              {buildLineItems()}
            </Table>
          </div>
      </div>
    );
  }
}

export default ShoppingCart;
