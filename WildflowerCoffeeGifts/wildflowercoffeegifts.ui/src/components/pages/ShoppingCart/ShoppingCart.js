import React from 'react';
import { Table } from 'reactstrap';

import SingleLineItem from '../../shared/SingleLineItem/SingleLineItem';

import ordersData from '../../../helpers/data/ordersData';
import paymentTypesData from '../../../helpers/data/paymentTypesData';
import usersData from '../../../helpers/data/usersData';

import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: {},
    lineItems: [],
    user: {},
    userId: 6,
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

  buildCartPage = () => {
    const { userId, cart } = this.state;
    this.getCart(userId);
    this.getUser(userId);
  }

  componentDidMount() {
    this.buildCartPage();
  }

  createCart = (e) => {
    e.preventDefault();
    const { cart, userId } = this.state;
    // first, we create the new payment option - a placeholder record for the data the user will provide before finalizing the order!
    const newPaymentType = {
      paymentOption: 'NewOptionNeedsUpdates',
      userId: 6, // we will replace this with a the userID of the logged in user!!
      accountNo: 0,
      expirationMonth: 0,
      expirationYear: 0,
      isActive: true,
    };
    // then we use the ID of the payment option to populate the paymentTypeId field on the new order:
    paymentTypesData.postPaymentType(newPaymentType)
      .then((paymentResponse) => {
        const newPaymentTypeId = paymentResponse.data.id;
        console.error('new payment type', paymentResponse);
        const newOrder = {
          userId: 6, // we will replace this with a the userID of the logged in user!!
          isCompleted: false,
          totalPrice: 0,
          paymentTypeId: newPaymentTypeId,
          purchaseDate: new Date(),
          deliveryAddress: '',
          isActive: true,
        };
        ordersData.postOrder(newOrder)
          .then((orderResponse) => {
            this.setState({
              cart: orderResponse.data,
              lineItems: [],
            });
            console.error('response', orderResponse);
            console.error('current cart', this.state.cart);
          });
      })
      .catch((error) => console.error('Unable to create the new shopping cart.', error));
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
              <p>Click Start Shopping below to get started!</p>
              <button type="submit" className="btn" onClick={this.createCart}>Start Shopping</button>
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
