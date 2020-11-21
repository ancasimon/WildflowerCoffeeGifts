import React from 'react';

import PropTypes from 'prop-types';

import SingleProduct from '../../shared/SingleProduct/SingleProduct';
import ProductThemes from '../ProductThemes/ProductThemes';

import productsData from '../../../helpers/data/productsData';

import './Products.scss';

class Products extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    products: [],
  };

  componentDidMount() {
    productsData.getAllProducts()
      .then((products) => { this.setState({ products }); });
  }

  render() {
    const { products } = this.state;
    const { authed } = this.props;
    const buildProducts = products.map((product) => (<SingleProduct key={product.id} product={product} authed={authed}/>));

    return (
        <div className="container product-view">
          <div className="row">
            <div className="col-3 product-cat">
             <ProductThemes/>
            </div>
            <div className="col-9 d-flex flex-wrap">
              {buildProducts}
            </div>
            </div>
            </div>
    );
  }
}

export default Products;
