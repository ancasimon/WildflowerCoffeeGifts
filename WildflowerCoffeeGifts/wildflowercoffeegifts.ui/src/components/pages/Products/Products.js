import React from 'react';

import './Products.scss';
import productsData from '../../../helpers/data/productsData';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
import SearchedProducts from '../SearchedProducts/SearchedProducts';

class Products extends React.Component {
  state = {
    products: [],
    inputValue: '',
  };

  filterProducts = (e) => {
    console.error('test', e.target.value);
    this.setState({
      inputValue: e.target.value,
    });
  }

  componentDidMount() {
    productsData.getAllProducts()
      .then((products) => { this.setState({ products }); });
  }

  render() {
    const { products } = this.state;
    const buildProducts = products.map((product) => (<SingleProduct key={product.id} product={product}/>));

    return (
      <div>
        <SearchedProducts />
      <div className="d-flex flex-wrap">
        {buildProducts}
      </div>
      </div>
    );
  }
}

export default Products;
