import React from 'react';
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
                <img src="selectedProduct.imageUrl" alt="flower package photo" />
                <h3>Price: ${selectedProduct.price}</h3>
                <h4>{selectedProduct.description}</h4>
                <h6>Product Theme: {selectedProduct.productThemeId}</h6>
                <h6>Coffee Mug: {selectedProduct.coffeeMugId}</h6>
                <h6>Flower Arrangement: {selectedProduct.flowerArrId}</h6>
            </div>
    );
  }
}

export default SingleProductView;
