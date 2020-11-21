import React from 'react';
import Swal from 'sweetalert2';
import {
  Button,
  Collapse,
  CardBody,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import SingleLineItem from '../../shared/SingleLineItem/SingleLineItem';

import ordersData from '../../../helpers/data/ordersData';
import paymentTypesData from '../../../helpers/data/paymentTypesData';
import usersData from '../../../helpers/data/usersData';

import './ShoppingCart.scss';
import '../../../styles/index.scss';

class ShoppingCart extends React.Component {
  state = {
    cart: {},
    cartId: 0,
    lineItems: [],
    user: {},
    userId: 22,
    uid: '',
    paymentTypeId: 0,
    selectedPaymentType: {},
    validOrder: true,
    isOpenDeliveryInfo: false,
    isOpenBillingInfo: false,
    recipientEmail: '',
    recipientPhone: 0,
    recipientFirstName: '',
    recipientLastName: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: 0,
    userEmail: '',
    userPhoneNumber: 0,
    userFirstName: '',
    userLastName: '',
    userAddress: '',
    userCity: '',
    userState: 0,
    paymentOption: '',
    accountNo: 0,
    expirationMonth: 0,
    expirationYear: 0,
    ccv: 0,
    modal: false,
    paymentTypes: [],
    dropdownOpen: false,
  }

  toggleModal = () => {
    this.setState({ modal: !this.setState.modal });
  }

  closeModal = () => {
    this.setState({ modal: false });
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  toggleDeliveryInfo = () => {
    this.setState({ isOpenDeliveryInfo: !this.setState.isOpenDeliveryInfo });
  }

  toggleBillingInfo = () => {
    this.setState({ isOpenBillingInfo: !this.setState.isOpenBillingInfo });
  }

  getUser = () => {
    const { userId } = this.state;
    usersData.getSingleUser(userId)
      .then((userResponse) => {
        this.setState({
          user: userResponse.data,
          userEmail: userResponse.data.email,
          userPhoneNumber: userResponse.data.phoneNumber,
          userFirstName: userResponse.data.firstName,
          userLastName: userResponse.data.lastName,
          userAddress: userResponse.data.address,
          userCity: userResponse.data.city,
          userState: userResponse.data.usState,
          uid: userResponse.data.uid,
        });
        console.log('user', userResponse);
      })
      .catch((error) => console.error('Unable to get user record.', error));
  }

  getPaymentTypes = () => {
    // const { userId } = this.state;
    const {}
    paymentTypesData.getAllPaymentTypesByUserId(userId)
      .then((userPaymentTypesResponse) => {
        this.setState({ paymentTypes: userPaymentTypesResponse.data });
        console.error('pmt types', userPaymentTypesResponse.data);
      })
      .catch((error) => console.error('Unable to get payment types for this user.'));
  }

  getCart = () => {
    const {
      cart,
      userId,
      lineItems,
      paymentTypeId,
      selectedPaymentType,
      validOrder,
      recipientEmail,
      recipientPhone,
      recipientFirstName,
      recipientLastName,
      deliveryAddress,
      deliveryCity,
      deliveryState,
    } = this.state;

    ordersData.getCart(userId)
      .then((cartResponse) => {
        if (cartResponse.status === 200) {
          this.setState({
            cart: cartResponse.data,
            cartId: cartResponse.data.id,
            lineItems: cartResponse.data.lineItems,
            paymentTypeId: cartResponse.data.paymentTypeId,
            // recipientEmail: cartResponse.data.recipientEmail,
            // recipientPhone: cartResponse.data.recipientPhone,
            // recipientFirstName: cartResponse.data.recipientFirstName,
            // recipientLastName: cartResponse.data.recipientLastName,
            // deliveryAddress: cartResponse.data.deliveryAddress,
            // deliveryCity: cartResponse.data.deliveryCity,
            // deliveryState: cartResponse.data.deliveryState,
          });
          console.error('cart resp', cartResponse);
          if (paymentTypeId != null) {
            paymentTypesData.getSinglePaymentType(this.state.paymentTypeId)
              .then((paymentTypeResponse) => {
                console.error('paymenttypeinfo', paymentTypeResponse);
                this.setState({
                  selectedPaymentType: paymentTypeResponse.data,
                  paymentOption: paymentTypeResponse.data.paymentOption,
                  accountNo: paymentTypeResponse.data.accountNo,
                  expirationMonth: paymentTypeResponse.data.expirationMonth,
                  expirationYear: paymentTypeResponse.data.expirationYear,
                  ccv: paymentTypeResponse.data.ccv,
                });
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
            // deliveryAddress: '',
            // deliveryCity: '',
            // deliveryState: '',
            // recipientEmail: '',
            // recipientPhone: '',
            // recipientFirstName: '',
            // recipientLastName: '',
            // paymentOption: '',
            // accountNo: 0,
            // expirationMonth: 0,
            // expirationYear: 0,
            // ccv: 0,
          });
        }
        console.error('cart from db', cartResponse);
        console.error('current cart', this.state.cart);
      })
      .catch((error) => console.error('Unable to get the shopping cart.', error));
  }

  buildCartPage = () => {
    const { userId, cart } = this.state;
    this.getCart(userId);
    this.getUser(userId);
    this.getPaymentTypes(userId);
  }

  componentDidMount() {
    this.buildCartPage();
    // this.validateOrder();
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

  changeRecipientEmail = (e) => {
    e.preventDefault();
    this.setState({ recipientEmail: e.target.value });
  }

  changeRecipientPhoneNumber = (e) => {
    e.preventDefault();
    this.setState({ recipientPhone: e.target.value * 1 });
  }

  changeRecipientFirstName = (e) => {
    e.preventDefault();
    this.setState({ recipientFirstName: e.target.value });
  }

  changeRecipientLastName = (e) => {
    e.preventDefault();
    this.setState({ recipientLastName: e.target.value });
  }

  changeDeliveryAddress = (e) => {
    e.preventDefault();
    this.setState({ deliveryAddress: e.target.value });
  }

  changeDeliveryCity = (e) => {
    e.preventDefault();
    this.setState({ deliveryCity: e.target.value });
  }

  changeDeliveryState = (e) => {
    e.preventDefault();
    this.setState({ deliveryState: e.target.value * 1 });
  }

  changeUserEmail = (e) => {
    e.preventDefault();
    this.setState({ userEmail: e.target.value });
  }

  changeUserPhoneNumber = (e) => {
    e.preventDefault();
    this.setState({ userPhoneNumber: e.target.value * 1 });
  }

  changeUserFirstName = (e) => {
    e.preventDefault();
    this.setState({ userFirstName: e.target.value });
  }

  changeUserLastName = (e) => {
    e.preventDefault();
    this.setState({ userLastName: e.target.value });
  }

  changeUserAddress = (e) => {
    e.preventDefault();
    this.setState({ userAddress: e.target.value });
  }

  changeUserCity = (e) => {
    e.preventDefault();
    this.setState({ userCity: e.target.value });
  }

  changeUserState = (e) => {
    e.preventDefault();
    this.setState({ userState: e.target.value * 1 });
  }

  changeSelectedPaymentType = (e) => {
    const newlySelectedPaymentTypeRecord = this.state.paymentTypes.filter((x) => x.id === (e.target.value * 1));
    console.error('newlyselctedpmt', newlySelectedPaymentTypeRecord);
    e.preventDefault();
    this.setState({
      paymentTypeId: e.target.value * 1,
      selectedPaymentType: newlySelectedPaymentTypeRecord[0],
      paymentOption: newlySelectedPaymentTypeRecord[0].paymentOption,
      accountNo: newlySelectedPaymentTypeRecord[0].accountNo,
      expirationMonth: newlySelectedPaymentTypeRecord[0].expirationMonth,
      expirationYear: newlySelectedPaymentTypeRecord[0].expirationYear,
      ccv: newlySelectedPaymentTypeRecord[0].ccv,
    });
  }

  changePaymentType = (e) => {
    e.preventDefault();
    this.setState({ paymentOption: e.target.value });
  }

  changeAccountNo = (e) => {
    e.preventDefault();
    this.setState({ accountNo: e.target.value * 1 });
  }

  changeExpMonth = (e) => {
    e.preventDefault();
    this.setState({ expirationMonth: e.target.value * 1 });
  }

  changeExpYear = (e) => {
    e.preventDefault();
    this.setState({ expirationYear: e.target.value * 1 });
  }

  changeCcv = (e) => {
    e.preventDefault();
    this.setState({ ccv: e.target.value * 1 });
  }

  addNewPaymentType = (e) => {
    e.preventDefault();
    const newPaymentTypeObject = {
      paymentOption: 'Please enter a payment type.',
      accountNo: 0,
      expirationMonth: 0,
      expirationYear: 0,
      ccv: 0,
      isActive: true,
      userId: this.state.userId,
    };
    paymentTypesData.postPaymentType(newPaymentTypeObject)
      .then((newPaymentTypeResponse) => {
        console.error('NEW paymenttypeinfo', newPaymentTypeResponse);
        this.setState({
          selectedPaymentType: newPaymentTypeResponse.data,
          paymentOption: newPaymentTypeResponse.data.paymentOption,
          accountNo: newPaymentTypeResponse.data.accountNo,
          expirationMonth: newPaymentTypeResponse.data.expirationMonth,
          expirationYear: newPaymentTypeResponse.data.expirationYear,
          ccv: newPaymentTypeResponse.data.ccv,
        });
      });
  }

  // validateOrder = () => {
  //   const {
  //     cart,
  //     cartId,
  //     lineItems,
  //     user,
  //     userId,
  //     paymentTypeId,
  //     selectedPaymentType,
  //     validOrder,
  //     purchaseDate,
  //     deliveryAddress,
  //     isActive,
  //     deliveryCity,
  //     deliveryState,
  //     recipientEmail,
  //     recipientPhone,
  //     recipientFirstName,
  //     recipientLastName,
  //   } = this.state;
  //   console.error('valid?? line items', lineItems.length);
  //   if (lineItems.length < 1) return;
  // if (cart.recipientLastName) //better rely onthe Javascript falsey value

  //   if (cart.deliveryAddress != '') {
  //     if (cart.deliveryCity != '') {
  //       if (cart.deliveryState != undefined) {
  //         if (user.firstName != '') {
  //           if (user.lastName != '') {
  //             if (user.address != '') {
  //               if (user.city != '') {
  //                 if (user.usState != undefined) {
  //                   if (selectedPaymentType.paymentOption != '') {
  //                     if (selectedPaymentType.accountNo != 0) {
  //                       if (selectedPaymentType.expirationMonth != 0) {
  //                         if (selectedPaymentType.expirationYear != 0) {
  //                           if (selectedPaymentType.ccv != 0) {
  //                             this.setState({ validOrder: true });
  //                             console.error('valid??', this.state.validOrder);
  //                           }
  //                         }
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // }
  //   this.setState({ validOrder: true });
  // }

  validationAlert = () => {
    Swal.fire('You must enter all required data. Please see fields marked with an asterisk (*).');
  }

  successfulPurchaseAlert = () => {
    Swal.fire('Congratulations! Your order is on its way!');
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
      userEmail,
      userPhoneNumber,
      userFirstName,
      userLastName,
      userAddress,
      userCity,
      userState,
      paymentOption,
      accountNo,
      expirationMonth,
      expirationYear,
      ccv,
      validOrder,
    } = this.state;
    const updatedOrder = {
      id: cartId,
      userId: cart.userId,
      isCompleted: true,
      totalPrice: cart.totalPrice,
      paymentTypeId: this.state.selectedPaymentType.id,
      purchaseDate: new Date,
      isActive: cart.isActive,
      lineItems: cart.lineItems,
      deliveryAddress: this.state.deliveryAddress,
      deliveryCity: this.state.deliveryCity,
      deliveryState: this.state.deliveryState,
      recipientEmail: this.state.recipientEmail,
      recipientPhone: this.state.recipientPhone,
      recipientFirstName: this.state.recipientFirstName,
      recipientLastName: this.state.recipientLastName,
    };
    const updatedUser = {
      id: user.Id,
      isActive: user.isActive,
      email: userEmail,
      username: user.userName,
      password: user.password,
      phoneNumber: userPhoneNumber,
      firstName: userFirstName,
      lastName: userLastName,
      address: userAddress,
      city: userCity,
      usState: userState,
      dateCreated: user.dateCreated,
      isActive: user.isActive,
    };
    const updatedPaymentType = {
      id: this.state.selectedPaymentType.id,
      paymentOption,
      userId,
      accountNo,
      expirationMonth,
      expirationYear,
      ccv,
      isActive,
    };
    // this.validateOrder();
    console.error(this.state.lineItems.length, cart.recipientLastName, cart.deliveryAddress, cart.deliveryCity, cart.deliveryState, user.firstName, user.lastName, user.address, user.city, user.usState, selectedPaymentType.paymentOption, selectedPaymentType.accountNo, selectedPaymentType.expirationMonth, selectedPaymentType.expirationYear, selectedPaymentType.ccv);
    console.error('is it valid??', this.state.validOrder);
    if (this.state.validOrder == true) {
      paymentTypesData.updatePaymentType(selectedPaymentType.id, updatedPaymentType)
        .then((updatedPaymentTypeResponse) => {
          console.error('updatedpayment respo', updatedPaymentTypeResponse);
          usersData.updateUser(userId, updatedUser)
            .then((updatedUserResponse) => {
              console.error('updateduser resp', updatedUserResponse);
              ordersData.updateOrder(cartId, updatedOrder)
                .then((updatedOrderResponse) => {
                  console.error('updated order respo', updatedOrderResponse);
                  this.successfulPurchaseAlert();
                  this.props.history.push('/products');
                });
            });
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
      isOpenDeliveryInfo,
      isOpenBillingInfo,
      recipientEmail,
      recipientPhone,
      recipientFirstName,
      recipientLastName,
      deliveryAddress,
      deliveryCity,
      deliveryState,
      userEmail,
      userPhoneNumber,
      userFirstName,
      userLastName,
      userAddress,
      userCity,
      userState,
      paymentOption,
      accountNo,
      expirationMonth,
      expirationYear,
      ccv,
      paymentTypes,
      dropdownOpen,
      modal,
    } = this.state;

    const buildLineItems = () => lineItems.map((item) => (
      <SingleLineItem key={item.Id} item={item} buildCartPage={this.buildCartPage} />
    ));

    const buildPaymentTypes = () => paymentTypes.map((item) => (
      <DropdownItem key={item.id} value={item.id} onClick={this.changeSelectedPaymentType}>{item.paymentOption}</DropdownItem>
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
                  <div className="p-2">
                    <button type='submit' className='btn wcgButton' onClick={this.createCart}>Start Shopping</button>
                    </div>
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
              <div className="pb-5 pt-3">
                <Link to='/products' className="wcgButton">Continue Shopping</Link>
              </div>
              </div>
          }
          <div>
            <Button className="wcgButton" onClick={this.toggleDeliveryInfo}>Add Delivery Address</Button>
              <Collapse isOpen={isOpenDeliveryInfo}>
                <Card className="newBlock">
                  <CardBody>
                    <form>
                      <h2>Delivery Information</h2>
                        <div className='form-group'>
                          <label htmlFor='recipientEmail'>Recipient Email Address</label>
                          <input type='email' className='form-control' id='recipientEmail' placeholder='Please enter the email address of the recipient.' value={this.state.recipientEmail} onChange={this.changeRecipientEmail} />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='recipientPhone'>Recipient Phone Number</label>
                          <input type='text' className='form-control' id='recipientPhone' placeholder='Please enter a phone number for the recipient.' value={this.state.recipientPhone} onChange={this.changeRecipientPhoneNumber} />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='recipientFirstName'>First Name</label>
                          <input className='form-control' type='text' id='recipientFirstName' placeholder='Please enter the first name of the recipient.' value={this.state.recipientFirstName} onChange={this.changeRecipientFirstName} />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='recipientLastName'>Last Name*</label>
                          <input className='form-control' type='text' id='recipientLastName' placeholder='Please enter the last name of the recipient.' value={this.state.recipientLastName} onChange={this.changeRecipientLastName} />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='recipientAddress'>Delivery Address*</label>
                          <textarea className='form-control' id='recipientAddress' rows='2' placeholder='Please enter the delivery address.' value={this.state.deliveryAddress} onChange={this.changeDeliveryAddress}></textarea>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='recipientCity'>Delivery City*</label>
                          <input className='form-control' type='text' id='recipientCity' placeholder='Please enter delivery city.' value={this.state.deliveryCity} onChange={this.changeDeliveryCity} />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='recipientState'>Delivery State*</label>
                          <select className='form-control' id='recipientState' placeholder={this.state.deliveryState} value={this.state.deliveryState} onChange={this.changeDeliveryState}>
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
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
              <div>
                <Button className="wcgButton" onClick={this.toggleBillingInfo}>Add Billing Address</Button>
                  <Collapse isOpen={isOpenBillingInfo}>
                    <Card className="newBlock">
                      <CardBody>
                        <h2>Billing Information</h2>
                        <form>
                        <div className='form-group'>
                            <label htmlFor='userEmail'>Email</label>
                            <input type='email' className='form-control' id='userEmail' placeholder={userEmail} value={userEmail} onChange={this.changeUserEmail} />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='userPhone'>Phone Number</label>
                            <input type='text' className='form-control' id='userPhone' placeholder={userPhoneNumber} value={userPhoneNumber} onChange={this.changeUserPhoneNumber} />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='userFirstName'>First Name*</label>
                            <input className='form-control' type='text' id='userFirstName' placeholder={userFirstName} value={userFirstName} onChange={this.changeUserFirstName} />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='userLastName'>Last Name*</label>
                            <input className='form-control' type='text' id='userLastName' placeholder={userLastName} value={userLastName} onChange={this.changeUserLastName} />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='userAddress'>Billing Address*</label>
                            <textarea className='form-control' id='userAddress' rows='2' placeholder={userAddress} value={userAddress} onChange={this.changeUserAddress}></textarea>
                          </div>
                          <div className='form-group'>
                            <label htmlFor='userCity'>Billing City*</label>
                            <input className='form-control' type='text' id='userCity' placeholder={userCity} value={userCity} onChange={this.changeUserCity} />
                          </div>
                          <div className='form-group'>
                            <label htmlFor='userState'>Billing State*</label>
                            <select className='form-control' id='userState' placeholder={userState} value={userState} onChange={this.changeUserState}>
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
                      </CardBody>
                  </Card>
                </Collapse>
                </div>
          <div>
          <button type='submit' className='btn wcgButton' onClick={this.toggleModal}>Add Payment Details</button>

          {/* modal with payment info below: */}
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Payment Information</ModalHeader>
            <ModalBody>
            <div>
            <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdown}>
                    <DropdownToggle caret>
                    Select a payment type
                    </DropdownToggle>
                      <DropdownMenu>
                        {buildPaymentTypes()}
                        <DropdownItem key='newCard' value='newCard' onClick={this.addNewPaymentType}>Add a New Card</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
            </div>
            <div>
              <form>
                <div className='form-group'>
                  <label htmlFor='paymentOption'>Payment Type*</label>
                  <input type='text' className='form-control' id='paymentOption' placeholder={this.state.paymentOption} value={paymentOption} onChange={this.changePaymentType} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentAccountNumber'>Account Number*</label>
                  <input type='text' className='form-control' id='paymentAccountNumber' placeholder={this.state.accountNo} value={accountNo} onChange={this.changeAccountNo} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentExpMonth'>Expiration Month*</label>
                  <input className='form-control' type='text' id='paymentExpMonth' placeholder={this.state.expirationMonth} value={expirationMonth} onChange={this.changeExpMonth} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentExpYear'>Expiration Year*</label>
                  <input className='form-control' type='text' id='paymentExpYear' placeholder={this.state.expirationYear} value={expirationYear} onChange={this.changeExpYear} />
                </div>
                <div className='form-group'>
                  <label htmlFor='paymentCcv'>CCV*</label>
                  <input className='form-control' id='text' id='paymentCcv' placeholder={this.state.ccv} value={ccv} onChange={this.changeCcv} ></input>
                </div>
              </form>
            </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.placeOrder}>Place Order</Button>{' '}
                <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
