import React from 'react';
import { CarouselControl, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    userId: 1,
    paymentTypeId: 0,
    selectedPaymentType: {},
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
    const {
      cart,
      userId,
      lineItems,
      paymentTypeId,
      selectedPaymentType,
    } = this.state;

    ordersData.getCart(userId)
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            cart: response.data,
            lineItems: response.data.lineItems,
            paymentTypeId: response.data.paymentTypeId,
          });
          if (paymentTypeId != null) {
            paymentTypesData.getSinglePaymentType(this.state.paymentTypeId)
              .then((paymentTypeResponse) => {
                console.error('paymenttypeinfo', paymentTypeResponse);
                this.setState({ selectedPaymentType: paymentTypeResponse.data });
              });
          }
        } else {
          this.setState({
            cart: null,
            lineItems: [],
            paymentTypeId: 0,
            selectedPaymentType: {},
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
    const {
      cart,
      userId,
    } = this.state;
    ordersData.createCart(userId)
      .then((newOrderResponse) => {
        this.setState({
          cart: newOrderResponse.data,
          lineItems: [],
        });
      })
      .catch((error) => console.error('Unable to create the new shopping cart.', error));
  }

  render() {
    const {
      cart,
      lineItems,
      user,
      selectedPaymentType,
    } = this.state;
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
                  <button type='submit' className='btn' onClick={this.createCart}>Start Shopping</button>
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
                  <div className="p-3">
                    <Link to='/products'>Continue Shopping</Link>
                  </div>
                </div>
          }
          <div>
            <div>
              <h2>Delivery Information</h2>
                <form>
                  <div class='form-group'>
                    <label for='recipientEmail'>Recipient Email Address</label>
                    <input type='email' class='form-control' id='recipientEmail' placeholder='Please enter the email address of the recipient.' />
                  </div>
                  <div class='form-group'>
                    <label for='recipientPhone'>Recipient Phone Number</label>
                    <input type='text' class='form-control' id='recipientPhone' placeholder='Please enter a phone number for the recipient.' />
                  </div>
                  <div class='form-group'>
                    <label for='recipientFirstName'>First Name</label>
                    <input class='form-control' type='text' id='recipientFirstName' placeholder='Please enter the first name of the recipient.' />
                  </div>
                  <div class='form-group'>
                    <label for='recipientLastName'>Last Name</label>
                    <input class='form-control' type='text' id='recipientLastName' placeholder='Please enter the last name of the recipient.' />
                  </div>
                  <div class='form-group'>
                    <label for='recipientAddress'>Delivery Address</label>
                    <textarea class='form-control' id='recipientAddress' rows='2' placeholder={cart.deliveryAddress} value={cart.deliveryAddress}></textarea>
                  </div>
                  <div class='form-group'>
                    <label for='recipientCity'>Delivery City</label>
                    <input class='form-control' type='text' id='recipientCity' placeholder='Please enter delivery city.' />
                  </div>
                  <div class='form-group'>
                    <label for='recipientState'>Delivery State</label>
                    <select class='form-control' id='recipientState'>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                </form>
              </div>
              <div>
                <h2>Billing Information</h2>
                <form>
                <div class='form-group'>
                    <label for='userEmail'>Email</label>
                    <input type='email' class='form-control' id='userEmail' placeholder='Please enter your email address.' />
                  </div>
                  <div class='form-group'>
                    <label for='userPhone'>Phone Number</label>
                    <input type='text' class='form-control' id='userPhone' placeholder={'Please enter your phone number.'} />
                  </div>
                  <div class='form-group'>
                    <label for='userFirstName'>First Name</label>
                    <input class='form-control' type='text' id='userFirstName' placeholder={'Readonly input here...'} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='userLastName'>Last Name</label>
                    <input class='form-control' type='text' id='userLastName' placeholder={'Readonly input here...'} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='userAddress'>Billing Address</label>
                    <textarea class='form-control' id='userAddress' rows='2'></textarea>
                  </div>
                  <div class='form-group'>
                    <label for='userCity'>Billing City</label>
                    <input class='form-control' type='text' id='userCity' placeholder={'Readonly input here...'} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='userState'>Billing State</label>
                    <select class='form-control' id='userState'>
                    <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  </div>
                  </form>
                </div>
                <div>
                  <h2>Payment Information</h2>
                  <button type='submit' className='btn'>Select Another Payment Option</button>
                  <form>
                  <div class='form-group'>
                    <label for='paymentOption'>Payment Type</label>
                    <input type='text' class='form-control' id='paymentOption' placeholder={selectedPaymentType.paymentOption} value={selectedPaymentType.paymentOption} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentAccountNumber'>Account Number</label>
                    <input type='text' class='form-control' id='paymentAccountNumber' placeholder={selectedPaymentType.accountNo} value={selectedPaymentType.accountNo} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentExpMonth'>Expiration Month</label>
                    <input class='form-control' type='text' id='paymentExpMonth' placeholder={selectedPaymentType.expirationMonth} value={selectedPaymentType.expirationMonth} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentExpYear'>Expiration Year</label>
                    <input class='form-control' type='text' id='paymentExpYear' placeholder={selectedPaymentType.expirationYear} value={selectedPaymentType.expirationYear} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentCcv'>CCV</label>
                    <input class='form-control' id='text' id='paymentCcv' placeholder={selectedPaymentType.ccv} value={selectedPaymentType.ccv} readonly ></input>
                  </div>
                </form>
            </div>
          </div>
          <button type='submit' className='btn'>Place Order</button>
      </div>
    );
  }
}

export default ShoppingCart;
