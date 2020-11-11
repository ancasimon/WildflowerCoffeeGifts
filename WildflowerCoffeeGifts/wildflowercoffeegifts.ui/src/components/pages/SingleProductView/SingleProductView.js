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
    userId: 9,
    cart: {},
    lineItems: [],
    productQuantity: 1,
    productInCart: false,
  }

  buildSingleView = () => {
    const { selectedProductId } = this.state;
    productsData.getSingleProduct(selectedProductId)
      .then((response) => {
        this.setState({
          selectedProduct: response.data,
          selectedProductId: response.data.id,
          productQuantity: 1,
        });
        console.error('product response.data', response);
      })
      .catch((error) => console.error('Unable to get the selected product', error));
  }

  checkIfProductAlreadyInCart = () => {
    const productsArray = [];
    const {
      cart,
      lineItems,
      productId,
      productInCart,
    } = this.state;
    cart.lineItems.map((eachItem) => productsArray.push(eachItem.productId));
    if (productsArray.includes(productId)) {
      this.setState({ productInCart: true });
      console.error('array of prods in order', productsArray);
      console.error('FOR REAL - is prod in cart??', productInCart);
    }
    return productInCart;
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

  changeProductQuantity = (e) => {
    e.preventDefault();
    this.setState({ productQuantity: e.target.value * 1 });
  }

  addToCart = (e) => {
    e.preventDefault();
    const {
      cart,
      userId,
      selectedProduct,
      selectedProductId,
      productQuantity,
      productInCart,
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
            qty: productQuantity,
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
              this.props.history.push('/cart');
              console.error('final order with new line item IN NO CART SCENARIO', this.state.cart);
            });
        })
        .catch((error) => console.error('Unable to create the new shopping cart.', error));
      // below is the scenario if a cart already exists!
    } else {
      const orderId = cart.id;
      const productId = this.state.selectedProductId;
      const newBool = this.checkIfProductAlreadyInCart();
      const selectedLineItem = {};
      console.error('new bool', newBool);
      if (productInCart == true) {
        for (let i = 0; i < cart.lineItems.length; i += 1) {
          if (cart.lineItems[i].productId === productId) {
            selectedLineItem = cart.lineItems[i];
            console.error('selected lineitem', selectedLineItem);
            productOrdersData.updateProductOrder(selectedLineItem.id, selectedLineItem)
              .then((lineItemUpdateResponse) => {
                console.error('prodOrdrec update', lineItemUpdateResponse);
                this.props.history.push('/cart');
              })
              .catch((error) => console.error('Unable to update the quantity for this product.', error));
            console.error('is this prd in cart already?', this.state.productInCart);
            break;
          }
        }
      } else {
        const newProductOrder = {
          productId,
          orderId,
          qty: this.state.productQuantity,
          isActive: true,
          title: '',
          price: 0,
          subtotal: 0,
        };
        console.error('new productOrder object', newProductOrder);
        productOrdersData.postProductOrder(newProductOrder)
          .then((productOrderResponse) => {
            const brandNewLineItem = productOrderResponse.data;
            const currentCart = this.state.cart;
            currentCart.lineItems.push(productOrderResponse.data);
            this.setState({ cart: currentCart });
            this.props.history.push('/cart');
            console.error('final order with new line item', this.state.cart);
          })
          .catch((error) => console.error('Unable to create the new line item for this product.', error));
      }
    }
  }

  componentDidMount() {
    const { selectedProductId } = this.state;
    this.buildSingleView(selectedProductId);
    this.getCart();
  }

  render() {
    const { selectedProduct, productQuantity } = this.state;

    return (
            <div>
                  <Link to='/products' className="return-back"><i className="fas fa-backward"></i>  Back To Products</Link>
                {
                selectedProduct.isActive
                  ? <div className="container view">
                    <div className="row">
                    <div className= "col-5">
                      <img src={selectedProduct.imageUrl} alt="flower package photo" className="productImages"/>
                      </div>
                      <div className="col-7">
                      <h4 className="product-title">{selectedProduct.title}</h4>
                      <p className="desc">{selectedProduct.description}</p>
                      <p className="price">PRICE: ${selectedProduct.price}.00</p>
                      <p><b>Available Quantity:</b> {selectedProduct.quantityAvailable}</p>
                      <p><b>Product Theme:</b> {selectedProduct.productThemeName}</p>
                      <p><b>Coffee Mug:</b> {selectedProduct.coffeeMugName}</p>
                      <p><b>Flower Arrangement:</b> {selectedProduct.flowerArrName}</p>
                      <label htmlFor="product-quantity"><b>Quantity:</b></label>
                      <input id="product-quantity" className="qty-input" type="text" value={productQuantity} onChange={this.changeProductQuantity} />
                      <button className="cart" type="submit" className="btn" onClick={this.addToCart}>Add to Cart</button>
                    </div>
                    </div>
                    </div>
                  : <div>
                      <p>This product is no longer available. Please select a different product. Thank you for your understanding!</p>
                    </div>
                }
            </div>
    );
  }
}

export default SingleProductView;
