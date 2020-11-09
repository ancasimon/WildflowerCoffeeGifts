import React from 'react';
import ProductThemes from '../ProductThemes/ProductThemes';
import productsData from '../../../helpers/data/productsData';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';

import './Home.scss';

class Home extends React.Component {
  state = { products: [] };

  componentDidMount() {
    productsData.getTwentyProducts()
      .then((products) => {
        this.setState({ products });
      });
  }

  render() {
    const { products } = this.state;
    const buildTwentyProducts = products.map((product) => (<SingleProduct key={product.id} product={product}/>));

    return (
      <div>
        <h1> Latest Products</h1>
        <div className="d-flex flex-wrap">
          {buildTwentyProducts}
        </div>
        <div>
      <h1>Product Themes</h1>
       <ProductThemes/>
      </div>
      </div>
    );
  }
}

export default Home;
