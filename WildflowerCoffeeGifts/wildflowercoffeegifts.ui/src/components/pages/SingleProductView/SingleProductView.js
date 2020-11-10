import React from 'react';
import { Link } from 'react-router-dom';
import ordersData from '../../../helpers/data/ordersData';
import productOrdersData from '../../../helpers/data/productOrdersData';
import productsData from '../../../helpers/data/productsData';
import StarRating from '../StarRating/StarRating';

import './SingleProductView.scss';

class SingleProductView extends React.Component {
  state = {
    selectedProduct: {},
    selectedProductId: this.props.match.params.id, // we may need to move this to props when we do the product cards and pass down the id of the card selected ...
  }

  buildSingleView = () => {
    const { selectedProductId } = this.state;
    productsData.getSingleProduct(selectedProductId)
      .then((response) => {
        this.setState({
          selectedProduct: response.data,
        });
        console.error('response.data', response);
      })
      .catch((error) => console.error('Unable to get the selected product', error));
  }

  addToCart = (e) => {
    e.preventDefault();
    const { cart } = this.state;
    if (cart == null) {
      ordersData.postOrder()
        .then((response) => {
          this.setState({
            cart: response.data,
          });
          productOrdersData.postProductOrder();
          // still wip here!
          // need to check for the response for the order here / cart is not empty when there is a pending order associated with the user???
          // need to check if the selected product is already in the cart (loop through line items) - if it is > increment its quantity by 1
          // need to add error messages when quantity available has been reached ...
          // need to add to data files: getting an order with line items!! get order for selected user ....
        })
        .catch((error) => console.error('Unble to add new order to cart', error));
    }
  }

  componentDidMount() {
    const { selectedProductId } = this.state;
    this.buildSingleView(selectedProductId);
  }

  render() {
    const { selectedProduct } = this.state;

    return (
            <div>
                {
                selectedProduct.isActive
                  ? <div className="container">
                    <div className="row">
                    <div className= "col-5">
                      <img src={selectedProduct.imageUrl} alt="flower package photo" className="productImages"/>
                      </div>
                      <div className="col-7">
                      <h4 className="product-title">{selectedProduct.title}</h4>
                      <StarRating key={selectedProduct.id}></StarRating>
                      <p className="desc">{selectedProduct.description}</p>
                      <p className="price">PRICE: ${selectedProduct.price}.00</p>
                      <p><b>Available Quantity:</b> {selectedProduct.quantityAvailable}</p>
                      <p><b>Product Theme:</b> {selectedProduct.productThemeName}</p>
                      <p><b>Coffee Mug:</b> {selectedProduct.coffeeMugName}</p>
                      <p><b>Flower Arrangement:</b> {selectedProduct.flowerArrName}</p>
                       <label><b>Quantity:</b></label>
                       <input className="qty-input" type="text" value="1"/>
                      <button className="cart">Add to Cart</button>
                    </div>
                    </div>
                    </div>
                  : <div>
                      <p>This product is no longer available. Please select a different product. Thank you for your understanding!</p>
                    </div>
                }
               <Link to='/products' className="backbtn">Back to Products</Link>
            </div>
    );
  }
}

export default SingleProductView;
