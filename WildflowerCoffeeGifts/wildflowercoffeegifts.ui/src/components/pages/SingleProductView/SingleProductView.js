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
    userId: 5,
    cart: {},
    lineItems: [],
    productQuantity: 1,
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
              console.error('final order with new line item', this.state.cart);
            });
        })
        .catch((error) => console.error('Unable to create the new shopping cart.', error));
    } else {
      const orderId = cart.id;
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
                      <input id="product-quantity" className="qty-input" type="number" value={productQuantity} onChange={this.changeProductQuantity} />
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
