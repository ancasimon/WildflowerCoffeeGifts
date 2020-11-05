import React from 'react';

import './Products.scss';
import productsData from '../../../helpers/data/productsData';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
import SearchedProducts from '../SearchedProducts/SearchedProducts';

class Products extends React.Component {
  state = {
    products: [],
    search: '',
    filteredProducts: [],
  };

  filterProducts = (e) => {
    console.error(e.target.value);
    const filter = this.state.search;
    if (filter !== '') {
      productsData.getSearchedProducts(filter)
        .then((response) => { this.setState({ filteredProducts: response }); });
    }
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
        <label htmlFor="search">Search Products <i class="fa fa-search"></i></label>
        <input type="text" name="search" value={this.state.search} onChange={this.filterProducts.bind(this)}/>
      <div className="d-flex flex-wrap">
        {buildProducts}
      </div>
      </div>
    );
  }
}

export default Products;
