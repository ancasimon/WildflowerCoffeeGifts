import React from 'react';

import './Products.scss';
import productsData from '../../../helpers/data/productsData';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
import ProductThemes from '../ProductThemes/ProductThemes';

class Products extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    productsData.getAllProducts()
      .then((products) => { this.setState({ products }); });
  }

  render() {
    const { products } = this.state;
    const buildProducts = products.map((product) => (<SingleProduct key={product.id} product={product}/>));

    return (
    <div className="Products">
          <div className="row">
            <div className="col-3 product-cat">
             <ProductThemes/>
            </div>
            <div className="col-9 d-flex flex-wrap">
              {buildProducts}
            </div>
            </div>
            // </div>
    );
  }
}

export default Products;
