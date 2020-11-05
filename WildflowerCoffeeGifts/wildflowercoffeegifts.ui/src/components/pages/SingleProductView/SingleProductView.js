import React from 'react';
import { Link } from 'react-router-dom';
import ordersData from '../../../helpers/data/ordersData';
import productOrdersData from '../../../helpers/data/productOrdersData';
import productsData from '../../../helpers/data/productsData';

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
                      <button>Add to Cart</button>
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
