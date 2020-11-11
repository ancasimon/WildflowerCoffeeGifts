import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

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
    userId: 5,
    cart: {},
    lineItems: [],
    qty: 1,
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
    const { cart, userId, qty } = this.state;
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
    if (cart == null) {
      ordersData.createCart(userId)
        .then((newOrderResponse) => {
          this.setState({
            cart: newOrderResponse.data,
            lineItems: [],
          });
          const orderId = newOrderResponse.data.id;
          const productId = this.state.selectedProductId;
          const newProductOrder = {
            productId,
            orderId,
            qty: 1,
            isActive: true,
            title: '',
            price: 0,
            subtotal: 0,
          };
          productOrdersData.postProductOrder(newProductOrder)
            .then((productOrderResponse) => {
              const brandNewLineItem = productOrderResponse.data;
              const currentCart = this.state.cart;
              currentCart.lineItems.push(productOrderResponse.data);
              this.setState({ cart: currentCart });
              console.error('final order with new line item', this.state.cart);
            });
        })
        .catch((error) => console.error('Unable to create the new shopping cart.', error));
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
