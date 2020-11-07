import React from 'react';
import PropTypes from 'prop-types';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
import productsData from '../../../helpers/data/productsData';

import './SearchedProducts.scss';
import SingleProductView from '../SingleProductView/SingleProductView';

class SearchedProducts extends React.Component {
  state = {
    productsReturnedFromSearch: [],
  }

  static propTypes = {
    searchInput: PropTypes.string,
  }

  filterAllProducts = () => {
    const searchInput = this.props.match.params.searchWord;
    productsData.getSearchedProducts(searchInput)
      .then((productsReturnedFromSearch) => {
        this.setState({ productsReturnedFromSearch });
      })
      .catch((err) => console.error('We are unable to find anything with this search! Try again.', err));
  }

  componentDidMount() {
    this.filterAllProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.productsReturnedFromSearch !== this.state.productsReturnedFromSearch) {
      this.filterAllProducts();
    }
  }

  render() {
    const { productsReturnedFromSearch } = this.state;
    const results = productsReturnedFromSearch.map((p) => (
      <SingleProduct key={p.id} product={p}/>
    ));
    return (
      <div className="d-flex flex-wrap">
        {results}
      </div>
    );
  }
}

export default SearchedProducts;
