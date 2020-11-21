import React from 'react';
import { Link } from 'react-router-dom';

import ShoppingCart from '../ShoppingCart/ShoppingCart';

import authData from '../../../helpers/data/authData';
import ordersData from '../../../helpers/data/ordersData';
import productOrdersData from '../../../helpers/data/productOrdersData';
import paymentTypesData from '../../../helpers/data/paymentTypesData';
import productsData from '../../../helpers/data/productsData';
import usersData from '../../../helpers/data/usersData';

import './SingleProductView.scss';

class SingleProductView extends React.Component {
  state = {
    selectedProduct: {},
    selectedProductId: this.props.match.params.id, // we may need to move this to props when we do the product cards and pass down the id of the card selected ...
    userId: 0,
    cart: {},
    lineItems: [],
    productQuantityOnSingleView: 1,
    previousQuantityInCart: 0,
    newproductQuantityForCart: 0,
    productInCart: false,
    relatedLineItemId: 0,
    relatedLineItem: {},
    uid: 0,
  }

  buildSingleView = () => {
    const { selectedProductId } = this.state;
    productsData.getSingleProduct(selectedProductId)
      .then((response) => {
        this.setState({
          selectedProduct: response.data,
          selectedProductId: response.data.id,
          productQuantityOnSingleView: 1,
        });
      })
      .catch((error) => console.error('Unable to get the selected product', error));
  }

  getUserIdByUid = () => {
    const uid = authData.getUid();
    console.error('uid!!!', uid);
    this.setState({ uid });
    usersData.getUserIdByUid(uid)
      .then((userIdResponse) => {
        console.error('userresp', userIdResponse);
        this.setState({ userId: userIdResponse.data });
      })
      .catch((error) => console.error('Could not get user by UID.', error));
  }

  getCart = () => {
    const {
      cart,
      userId,
      lineItems,
      selectedProductId,
      productInCart,
      productQuantityOnSingleView,
      newproductQuantityForCart,
      previousQuantityInCart,
      relatedLineItemId,
      relatedLineItem,
    } = this.state;
    usersData.getUserIdByUid(this.state.uid)
      .then((userIdResponse) => {
        console.error('userresp', userIdResponse);
        this.setState({ userId: userIdResponse.data });
        ordersData.getCart(this.state.uid)
          .then((orderResponse) => {
            if (orderResponse.status == 200) {
              this.setState({
                cart: orderResponse.data,
                lineItems: orderResponse.data.lineItems,
                userId: this.state.userId,
              });
              console.error('line items', this.state.lineItems);
              for (let i = 0; i < orderResponse.data.lineItems.length; i += 1) {
                if (orderResponse.data.lineItems[i].productId == this.state.selectedProductId) {
                  this.setState({ previousQuantityInCart: orderResponse.data.lineItems[i].qty });
                  this.setState({ productInCart: true });
                  this.setState({ relatedLineItemId: orderResponse.data.lineItems[i].id });
                  this.setState({ relatedLineItem: orderResponse.data.lineItems[i] });
                }
              }
            } else {
              this.setState({
                cart: null,
                lineItems: [],
              });
            }
          });
      })
      .catch((error) => console.error('Unable to get the shopping cart.', error));
  }

  componentDidMount() {
    const {
      selectedProductId,
      userId,
      productQuantityOnSingleView,
      previousQuantityInCart,
      newProductQuantityForCart,
      productInCart,
    } = this.state;
    this.buildSingleView(selectedProductId);
    this.getUserIdByUid();
    this.getCart(userId);
  }

  changeproductQuantityOnSingleView = (e) => {
    e.preventDefault();
    const {
      productQuantityOnSingleView,
      previousQuantityInCart,
      newProductQuantityForCart,
    } = this.state;
    this.setState({ productQuantityOnSingleView: e.target.value * 1 });
    // this.setState({ productQuantityOnSingleView: e.target.value * 1, newProductQuantityForCart: (this.state.previousQuantityInCart + (e.target.value * 1)) });
  }

  addToCart = (e) => {
    e.preventDefault();
    const {
      cart,
      userId,
      uid,
      selectedProduct,
      selectedProductId,
      productQuantityOnSingleView,
      productInCart,
      newProductQuantityForCart,
      relatedLineItemId,
      relatedLineItem,
    } = this.state;
    this.getUserIdByUid(this.state.uid);
    if (cart == null) {
      ordersData.createCart(this.state.uid)
        .then((newOrderResponse) => {
          console.error('order resp', newOrderResponse);
          this.setState({
            cart: newOrderResponse.data,
            lineItems: [],
            userId: this.state.userId,
          });
          const orderId = newOrderResponse.data.id;
          const productId = this.state.selectedProductId;
          const newProductOrder = {
            productId,
            orderId,
            qty: this.state.productQuantityOnSingleView,
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
            });
        })
        .catch((error) => console.error('Unable to create the new shopping cart.', error));
      // below is the scenario if a cart already exists!
    } else {
      const orderId = cart.id;
      const productId = this.state.selectedProductId;
      const isActive = this.state.relatedLineItem;
      this.setState({ newProductQuantityForCart: this.state.productQuantityOnSingleView + this.state.previousQuantityInCart });
      const updatedProductOrder = {
        productId: this.state.relatedLineItem.productId,
        orderId: this.state.relatedLineItem.orderId,
        qty: (this.state.productQuantityOnSingleView + this.state.previousQuantityInCart),
        isActive: this.state.relatedLineItem.isActive,
        // title: '',
        // price: 0,
        // subtotal: 0,
      };
      if (this.state.productInCart == true) {
        productOrdersData.updateProductOrder(this.state.relatedLineItemId, updatedProductOrder)
          .then((updatedLineItemResponse) => {
            // this.setState({ productInCart: true });
            this.props.history.push('/cart');
          })
        // productOrdersData.updateProductOrderBasedOnProductAndOrderIds(productId, orderId, (this.state.productQuantityOnSingleView + this.state.previousQuantityInCart))
        //   .then((updatedLineItemResponse) => {
        //     this.setState({ productInCart: true });
        //     this.props.history.push('/cart');
        //   })
          .catch((error) => console.error('Could not update quantity for this line item.', error));
      } else if (productInCart == false) {
        productOrdersData.postProductOrderBasedOnProductAndOrderIds(productId, orderId, this.state.productQuantityOnSingleView)
          .then((newLineItemResponse) => {
            this.props.history.push('/cart');
          })
          .catch((error) => console.error('Could not create a new line item!', error));
      }
    }
  }

  render() {
    const { selectedProduct, productQuantityOnSingleView } = this.state;

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
                      <input id="product-quantity" className="qty-input" type="text" value={productQuantityOnSingleView} onChange={this.changeproductQuantityOnSingleView} />
                      <button className="cart" type="submit" className="btn wcgButton" onClick={this.addToCart}>Add to Cart</button>
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
