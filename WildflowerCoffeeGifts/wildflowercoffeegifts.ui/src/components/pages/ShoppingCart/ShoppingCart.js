import React from 'react';
import Swal from 'sweetalert2';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import SingleLineItem from '../../shared/SingleLineItem/SingleLineItem';

import ordersData from '../../../helpers/data/ordersData';
import paymentTypesData from '../../../helpers/data/paymentTypesData';
import usersData from '../../../helpers/data/usersData';

import './ShoppingCart.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: {},
    cartId: 0,
    lineItems: [],
    user: {},
    userId: 1,
    paymentTypeId: 0,
    selectedPaymentType: {},
    validOrder: false,
    deliveryState: '',
  }

  getUser = () => {
    const { userId } = this.state;
    usersData.getSingleUser(userId)
      .then((response) => {
        this.setState({
          user: response.data,
        });
        console.log('user', response);
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
      validOrder,
      deliveryState,
    } = this.state;

    ordersData.getCart(userId)
      .then((response) => {
        if (response.status == 200) {
          this.setState({
            cart: response.data,
            cartId: response.data.id,
            lineItems: response.data.lineItems,
            paymentTypeId: response.data.paymentTypeId,
            deliveryState: cart.deliveryState,
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
            cartId: 0,
            lineItems: [],
            paymentTypeId: 0,
            selectedPaymentType: {},
            validOrder: false,
            deliveryState: '',
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
    this.validateOrder();
  }

  // componentDidUpdate() {
  //   this.validateOrder();
  // }

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

  changeDeliveryState = (e) => {
    e.preventDefault();
    this.setState({ deliveryState: e.target.value });
  }

  validateOrder = () => {
    const {
      cart,
      cartId,
      lineItems,
      user,
      userId,
      paymentTypeId,
      selectedPaymentType,
      validOrder,
      purchaseDate,
      deliveryAddress,
      isActive,
      deliveryCity,
      deliveryState,
      recipientEmail,
      recipientPhone,
      recipientFirstName,
      recipientLastName,
    } = this.state;
    if (lineItems.length > 0) {
      if (cart.recipientLastName != '') {
        if (cart.deliveryAddress != '') {
          if (cart.deliveryCity != '') {
            if (cart.deliveryState != '') {
              if (user.firstName != '') {
                if (user.lastName != '') {
                  if (user.address != '') {
                    if (user.city != '') {
                      if (user.usState != '') {
                        if (selectedPaymentType.paymentOption != '') {
                          if (selectedPaymentType.accountNo != 0) {
                            if (selectedPaymentType.expirationMonth != 0) {
                              if (selectedPaymentType.expirationYear != 0) {
                                if (selectedPaymentType.ccv != 0) {
                                  this.setState({ validOrder: true });
                                  console.error('valid??', this.state.validOrder);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  validationAlert = () => {
    Swal.fire('You must enter all required data. Please see fields marked with an asterisk (*).');
  }

  placeOrder = (e) => {
    e.preventDefault();
    const {
      cart,
      cartId,
      user,
      userId,
      totalPrice,
      paymentTypeId,
      selectedPaymentType,
      purchaseDate,
      deliveryAddress,
      isActive,
      lineItems,
      deliveryCity,
      deliveryState,
      recipientEmail,
      recipientPhone,
      recipientFirstName,
      recipientLastName,
      validOrder,
    } = this.state;
    const updatedOrder = {
      userId,
      isCompleted: true,
      totalPrice: cart.totalPrice,
      paymentTypeId: cart.paymentTypeId,
      purchaseDate: new Date,
      deliveryAddress: cart.deliveryAddress,
      isActive: cart.isActive,
      lineItems: cart.lineItems,
      deliveryCity: cart.deliveryCity,
      deliveryState: cart.deliveryState,
      recipientEmail: cart.recipientEmail,
      recipientPhone: cart.recipientPhone,
      recipientFirstName: cart.recipientFirstName,
      recipientLastName: cart.recipientLastName,
    };
    this.validateOrder();
    console.error(this.state.lineItems.length, cart.recipientLastName, cart.deliveryAddress, cart.deliveryCity, cart.deliveryState, user.firstName, user.lastName, user.address, user.city, user.usState, selectedPaymentType.paymentOption, selectedPaymentType.accountNo, selectedPaymentType.expirationMonth, selectedPaymentType.expirationYear, selectedPaymentType.ccv);
    console.error('is it valid??', this.state.validOrder);
    if (validOrder == true) {
      ordersData.updateOrder(cartId, updatedOrder)
        .then(() => {
          this.props.history.push('/products');
        })
        .catch((error) => console.error('We could not finalize your order', error));
    } else {
      this.validationAlert();
    }
  }

  render() {
    const {
      cart,
      lineItems,
      user,
      selectedPaymentType,
      deliveryState,
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
              <h4>Items*:</h4>
              <div>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Photo</th>
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
              <Link to='/products'>Continue Shopping</Link>
              </div>
          }
          <div>
            <div>
              <h2>Delivery Information</h2>
                <form>
                  <div class='form-group'>
                    <label for='recipientEmail'>Recipient Email Address</label>
                    <input type='email' class='form-control' id='recipientEmail' placeholder='Please enter the email address of the recipient.' value={cart.recipientEmail} />
                  </div>
                  <div class='form-group'>
                    <label for='recipientPhone'>Recipient Phone Number</label>
                    <input type='text' class='form-control' id='recipientPhone' placeholder='Please enter a phone number for the recipient.' value={cart.recipientPhone} />
                  </div>
                  <div class='form-group'>
                    <label for='recipientFirstName'>First Name</label>
                    <input class='form-control' type='text' id='recipientFirstName' placeholder='Please enter the first name of the recipient.' value={cart.recipientFirstName} />
                  </div>
                  <div class='form-group'>
                    <label for='recipientLastName'>Last Name*</label>
                    <input class='form-control' type='text' id='recipientLastName' placeholder='Please enter the last name of the recipient.' value={cart.recipientLastName} />
                  </div>
                  <div class='form-group'>
                    <label for='recipientAddress'>Delivery Address*</label>
                    <textarea class='form-control' id='recipientAddress' rows='2' placeholder='Please enter the delivery address.' value={cart.deliveryAddress}></textarea>
                  </div>
                  <div class='form-group'>
                    <label for='recipientCity'>Delivery City*</label>
                    <input class='form-control' type='text' id='recipientCity' placeholder='Please enter delivery city.' value={cart.deliveryCity} />
                  </div>
                  <div class='form-group'>
                    <label for='recipientState'>Delivery State*</label>
                    <select class='form-control' id='recipientState' placeholder={cart.deliveryState} value={cart.deliveryState} onChange={this.changeDeliveryState}>
                    <option value="0">Alabama</option>
                      <option value="1">Alaska</option>
                      <option value="2">Arizona</option>
                      <option value="3">Arkansas</option>
                      <option value="4">California</option>
                      <option value="5">Colorado</option>
                      <option value="6">Connecticut</option>
                      <option value="7">Delaware</option>
                      <option value="8">District Of Columbia</option>
                      <option value="9">Florida</option>
                      <option value="10">Georgia</option>
                      <option value="11">Hawaii</option>
                      <option value="12">Idaho</option>
                      <option value="13">Illinois</option>
                      <option value="14">Indiana</option>
                      <option value="15">Iowa</option>
                      <option value="16">Kansas</option>
                      <option value="17">Kentucky</option>
                      <option value="18">Louisiana</option>
                      <option value="19">Maine</option>
                      <option value="20">Maryland</option>
                      <option value="21">Massachusetts</option>
                      <option value="22">Michigan</option>
                      <option value="23">Minnesota</option>
                      <option value="24">Mississippi</option>
                      <option value="25">Missouri</option>
                      <option value="26">Montana</option>
                      <option value="27">Nebraska</option>
                      <option value="28">Nevada</option>
                      <option value="29">New Hampshire</option>
                      <option value="30">New Jersey</option>
                      <option value="31">New Mexico</option>
                      <option value="32">New York</option>
                      <option value="33">North Carolina</option>
                      <option value="34">North Dakota</option>
                      <option value="35">Ohio</option>
                      <option value="36">Oklahoma</option>
                      <option value="37">Oregon</option>
                      <option value="38">Pennsylvania</option>
                      <option value="39">Rhode Island</option>
                      <option value="40">South Carolina</option>
                      <option value="41">South Dakota</option>
                      <option value="42">Tennessee</option>
                      <option value="43">Texas</option>
                      <option value="44">Utah</option>
                      <option value="45">Vermont</option>
                      <option value="46">Virginia</option>
                      <option value="47">Washington</option>
                      <option value="48">West Virginia</option>
                      <option value="49">Wisconsin</option>
                      <option value="50">Wyoming</option>
                    </select>
                  </div>
                </form>
              </div>
              <div>
                <h2>Billing Information</h2>
                <form>
                <div class='form-group'>
                    <label for='userEmail'>Email</label>
                    <input type='email' class='form-control' id='userEmail' placeholder={user.email} value={user.email} />
                  </div>
                  <div class='form-group'>
                    <label for='userPhone'>Phone Number</label>
                    <input type='text' class='form-control' id='userPhone' placeholder={user.phoneNumber} value={user.phoneNumber} />
                  </div>
                  <div class='form-group'>
                    <label for='userFirstName'>First Name*</label>
                    <input class='form-control' type='text' id='userFirstName' placeholder={user.firstName} value={user.firstName} />
                  </div>
                  <div class='form-group'>
                    <label for='userLastName'>Last Name*</label>
                    <input class='form-control' type='text' id='userLastName' placeholder={user.lastName} value={user.lastName} />
                  </div>
                  <div class='form-group'>
                    <label for='userAddress'>Billing Address*</label>
                    <textarea class='form-control' id='userAddress' rows='2' placeholder={user.address} value={user.address}></textarea>
                  </div>
                  <div class='form-group'>
                    <label for='userCity'>Billing City*</label>
                    <input class='form-control' type='text' id='userCity' placeholder={user.city} value={user.city} />
                  </div>
                  <div class='form-group'>
                    <label for='userState'>Billing State*</label>
                    <select class='form-control' id='userState' placeholder={user.usState} value={user.usState}>
                      <option value="0">Alabama</option>
                      <option value="1">Alaska</option>
                      <option value="2">Arizona</option>
                      <option value="3">Arkansas</option>
                      <option value="4">California</option>
                      <option value="5">Colorado</option>
                      <option value="6">Connecticut</option>
                      <option value="7">Delaware</option>
                      <option value="8">District Of Columbia</option>
                      <option value="9">Florida</option>
                      <option value="10">Georgia</option>
                      <option value="11">Hawaii</option>
                      <option value="12">Idaho</option>
                      <option value="13">Illinois</option>
                      <option value="14">Indiana</option>
                      <option value="15">Iowa</option>
                      <option value="16">Kansas</option>
                      <option value="17">Kentucky</option>
                      <option value="18">Louisiana</option>
                      <option value="19">Maine</option>
                      <option value="20">Maryland</option>
                      <option value="21">Massachusetts</option>
                      <option value="22">Michigan</option>
                      <option value="23">Minnesota</option>
                      <option value="24">Mississippi</option>
                      <option value="25">Missouri</option>
                      <option value="26">Montana</option>
                      <option value="27">Nebraska</option>
                      <option value="28">Nevada</option>
                      <option value="29">New Hampshire</option>
                      <option value="30">New Jersey</option>
                      <option value="31">New Mexico</option>
                      <option value="32">New York</option>
                      <option value="33">North Carolina</option>
                      <option value="34">North Dakota</option>
                      <option value="35">Ohio</option>
                      <option value="36">Oklahoma</option>
                      <option value="37">Oregon</option>
                      <option value="38">Pennsylvania</option>
                      <option value="39">Rhode Island</option>
                      <option value="40">South Carolina</option>
                      <option value="41">South Dakota</option>
                      <option value="42">Tennessee</option>
                      <option value="43">Texas</option>
                      <option value="44">Utah</option>
                      <option value="45">Vermont</option>
                      <option value="46">Virginia</option>
                      <option value="47">Washington</option>
                      <option value="48">West Virginia</option>
                      <option value="49">Wisconsin</option>
                      <option value="50">Wyoming</option>
                    </select>
                  </div>
                  </form>
                </div>
                <div>
                  <h2>Payment Information</h2>
                  <button type='submit' className='btn'>Select Another Payment Option</button>
                  <form>
                  <div class='form-group'>
                    <label for='paymentOption'>Payment Type*</label>
                    <input type='text' class='form-control' id='paymentOption' placeholder={selectedPaymentType.paymentOption} value={selectedPaymentType.paymentOption} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentAccountNumber'>Account Number*</label>
                    <input type='text' class='form-control' id='paymentAccountNumber' placeholder={selectedPaymentType.accountNo} value={selectedPaymentType.accountNo} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentExpMonth'>Expiration Month*</label>
                    <input class='form-control' type='text' id='paymentExpMonth' placeholder={selectedPaymentType.expirationMonth} value={selectedPaymentType.expirationMonth} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentExpYear'>Expiration Year*</label>
                    <input class='form-control' type='text' id='paymentExpYear' placeholder={selectedPaymentType.expirationYear} value={selectedPaymentType.expirationYear} readonly />
                  </div>
                  <div class='form-group'>
                    <label for='paymentCcv'>CCV*</label>
                    <input class='form-control' id='text' id='paymentCcv' placeholder={selectedPaymentType.ccv} value={selectedPaymentType.ccv} readonly ></input>
                  </div>
                </form>
            </div>
          </div>
          <button type='submit' className='btn' onClick={this.placeOrder}>Place Order</button>
      </div>
    );
  }
}

export default ShoppingCart;
