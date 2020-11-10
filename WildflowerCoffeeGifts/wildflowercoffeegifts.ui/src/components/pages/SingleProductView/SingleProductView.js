import React from 'react';
import { Link } from 'react-router-dom';

import ShoppingCart from '../ShoppingCart/ShoppingCart';
import ordersData from '../../../helpers/data/ordersData';
import productOrdersData from '../../../helpers/data/productOrdersData';
import paymentTypesData from '../../../helpers/data/paymentTypesData';
import productsData from '../../../helpers/data/productsData';

import './SingleProductView.scss';

class SingleProductView extends React.Component {
  state = {
    selectedProduct: {},
    selectedProductId: this.props.match.params.id, // we may need to move this to props when we do the product cards and pass down the id of the card selected ...
    userId: 17,
    cart: {},
    lineItems: [],
  }

  buildSingleView = () => {
    const { selectedProductId } = this.state;
    productsData.getSingleProduct(selectedProductId)
      .then((response) => {
        this.setState({
          selectedProduct: response.data,
          selectedProductId: response.data.id,
        });
        console.error('product response.data', response);
      })
      .catch((error) => console.error('Unable to get the selected product', error));
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

  addToCart = (e) => {
    e.preventDefault();
    const {
      cart,
      userId,
      selectedProduct,
      selectedProductId,
    } = this.state;
    let newPaymentTypeId = 0;
    let newOrder = {};
    console.error('is cart null??', cart);
    if (cart == null) {
      // first, we check if we already have a payment type for the user on record - and get the latest payment type for this user:
      paymentTypesData.getLatestPaymentTypeForUser(this.state.userId)
        .then((latestPaymentResponse) => {
          // if we do have one or more payment types, we pick the one we have or the latest:
          if (latestPaymentResponse.status == 200) {
            newPaymentTypeId = latestPaymentResponse.data.id;
            console.error('latest payment', latestPaymentResponse);
            newOrder = {
              userId: this.state.userId, // we will replace this with a the userID of the logged in user!!
              isCompleted: false,
              totalPrice: 0,
              paymentTypeId: newPaymentTypeId,
              purchaseDate: new Date(),
              // purchaseDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
              deliveryAddress: '',
              isActive: true,
            };
          } else if (latestPaymentResponse.status == 204) {
            // if we do NOT have a payment type on record for the user, then we create one:
            // we create the new payment option - a placeholder record for the data the user will provide before finalizing the order!
            const newPaymentType = {
              paymentOption: 'Please add a payment type.',
              userId: this.state.userId, // we will replace this with the userID of the logged-in user!!
              accountNo: 0,
              expirationMonth: 0,
              expirationYear: 0,
              isActive: true,
            };
            console.error('new payment option', newPaymentType);
            // then we use the ID of the payment option we just created to populate the paymentTypeId field on the new order:
            paymentTypesData.postPaymentType(newPaymentType)
              .then((paymentResponse) => {
                newPaymentTypeId = paymentResponse.data.id;
                console.error('new payment type', paymentResponse);
                newOrder = {
                  userId: this.state.userId, // we will replace this with the userID of the logged in user!!
                  isCompleted: false,
                  totalPrice: 0,
                  paymentTypeId: newPaymentTypeId,
                  purchaseDate: new Date(),
                  deliveryAddress: '',
                  isActive: true,
                };
              });
          }
          ordersData.postOrder(newOrder)
            .then((orderResponse) => {
              this.setState({
                cart: orderResponse.data,
                lineItems: [],
              });
              console.error('order response', orderResponse);
              console.error('current cart', this.state.cart);
              const orderId = orderResponse.data.id;
              const productId = this.state.selectedProductId;
              console.error('prod id', productId);
              const newProductOrder = {
                productId: this.state.selectedProductId,
                orderId,
                qty: 1,
                isActive: true,
                title: '',
                price: 0,
                subtotal: 0,
              };
              console.error('new line item', newProductOrder);
              productOrdersData.postProductOrder(newProductOrder)
                .then((productOrderResponse) => {
                  console.error('prod ord resp', productOrderResponse);
                  const brandNewLineItem = productOrderResponse.data;
                  const currentCart = this.state.cart;
                  currentCart.lineItems.push(productOrderResponse.data);
                  this.setState({ cart: currentCart });
                  console.error('final order with new line item', this.state.cart);
                });
            });
        })
        .catch((error) => console.error('Unable to create the new shopping cart.', error));
      console.error('created cart order');
      // need to check if the selected product is already in the cart (loop through line items) - if it is > increment its quantity by 1
      // need to add error messages when quantity available has been reached ...
      // need to add to data files: getting an order with line items!! get order for selected user ....
    }
  }

  componentDidMount() {
    const { selectedProductId } = this.state;
    this.buildSingleView(selectedProductId);
    this.getCart();
  }

  render() {
    const { selectedProduct } = this.state;

    return (
            <div>
                <h1>{selectedProduct.title}</h1>
                {
                selectedProduct.isActive
                  ? <div>
                      <img src={selectedProduct.imageUrl} alt="flower package photo" className="productImages"/>
                      <h3>Price: ${selectedProduct.price}</h3>
                      <h3>Available Quantity: {selectedProduct.quantityAvailable}</h3>
                      <h4>{selectedProduct.description}</h4>
                      <h6>Product Theme: {selectedProduct.productThemeName}</h6>
                      <h6>Coffee Mug: {selectedProduct.coffeeMugName}</h6>
                      <h6>Flower Arrangement: {selectedProduct.flowerArrName}</h6>
                      <button type="submit" className="btn" onClick={this.addToCart}>Add to Cart</button>
                    </div>
                  : <div>
                      <p>This product is no longer available. Please select a different product. Thank you for your understanding!</p>
                    </div>
                }
               <Link to='/products'>Back to Products</Link>
            </div>
    );
  }
}

export default SingleProductView;
