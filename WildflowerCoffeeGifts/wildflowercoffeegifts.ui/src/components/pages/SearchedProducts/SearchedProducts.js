import React from 'react';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
import productsData from '../../../helpers/data/productsData';

import './SearchedProducts.scss';

class SearchedProducts extends React.Component {
  state = {
    productsReturnedFromSearch: [],
  }

  searchResults = () => {
    const input = this.props.match.params.keyword;
    console.error('input', input);
    productsData.getSearchedProducts(input)
      .then((productsReturnedFromSearch) => this.setState({ productsReturnedFromSearch }))
      .catch((err) => console.error('We are unable to find anything with this search! Try again.', err));
  }

  componentDidMount() {
    this.searchResults();
  }

  render() {
    const { searchedProducts } = this.state;
    const results = searchedProducts.map((p) => (
      <SingleProduct key={p.id} p={p}/>
    ));
    return (
      <div>
        {results}
      </div>
    );
  }
}

export default SearchedProducts;
