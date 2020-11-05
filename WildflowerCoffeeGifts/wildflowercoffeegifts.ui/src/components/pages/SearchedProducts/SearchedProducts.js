import React from 'react';
// import { Link } from 'react-router-dom';
import './SearchedProducts.scss';

class SearchedProducts extends React.Component {
  state = {
    search: '',
  }

  filterProducts = (e) => {
    this.setState({ search: e.target.value });
  }

  render() {
    return (
      <div>
        <label htmlFor="search">Search Products <i class="fa fa-search"></i></label>
        <input type="text" name="search" value={this.state.search} onChange={this.filterProducts.bind(this)}/>
      </div>
    );
  }
}

export default SearchedProducts;
