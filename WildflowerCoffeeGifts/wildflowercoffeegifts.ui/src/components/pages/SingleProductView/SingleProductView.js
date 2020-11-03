import React from 'react';
import { Link } from 'react-router-dom';
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
                      <img src="selectedProduct.imageUrl" alt="flower package photo" />
                      <h3>Price: ${selectedProduct.price}</h3>
                      <h3>Available Quantity: {selectedProduct.quantityAvailable}</h3>
                      <h4>{selectedProduct.description}</h4>
                      {/* <h6>Product Theme: {selectedProduct.pt.theme}</h6>
                      <h6>Coffee Mug: {selectedProduct.cm.title}</h6>
                      <h6>Flower Arrangement: {selectedProduct.fa.title}</h6> */}
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
