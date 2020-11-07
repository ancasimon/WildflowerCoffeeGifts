import React from 'react';
import PropTypes from 'prop-types';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
import productsData from '../../../helpers/data/productsData';

import './SearchedProducts.scss';

class SearchedProducts extends React.Component {
  state = {
    productsReturnedFromSearch: [],
  }

  static propTypes = {
    searchInput: PropTypes.string,
  }

  filterAllProducts = () => {
    // e.preventDefault();
    // this.setState({ searchInput: e.target.value.substr(0, 20) });
    const searchInput = this.props.match.params.searchWord;
    console.error('in searched componenet', searchInput);
    productsData.getSearchedProducts(searchInput)
      .then((productsReturnedFromSearch) => {
        this.setState({ productsReturnedFromSearch });
      })
      .catch((err) => console.error('We are unable to find anything with this search! Try again.', err));
  }

  componentDidMount() {
    this.filterAllProducts();
  }

  render() {
    const { productsReturnedFromSearch } = this.state;
    console.error('test', this.state.productsReturnedFromSearch);
    const results = productsReturnedFromSearch.map((p) => (
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
