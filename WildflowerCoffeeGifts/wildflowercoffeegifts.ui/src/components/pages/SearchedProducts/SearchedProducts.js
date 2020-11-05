import React from 'react';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
// import { Link } from 'react-router-dom';
// import productsData from '../../../helpers/data/productsData';

import './SearchedProducts.scss';

class SearchedProducts extends React.Component {
  render() {
    const searches = this.props.filteredProducts;
    const viewSearches = searches.map((search) => (
      <SingleProduct/>
    ));

    return (
      <div>
        {viewSearches}
      </div>
    );
  }
}

export default SearchedProducts;
