import React from 'react';
// import { Link } from 'react-router-dom';
import './SearchedProducts.scss';

class SearchedProducts extends React.Component {
  state = {
    inputValue: '',
  }

  render() {
    return (
      <div>
        <i class="fa fa-search"></i>
        <input type="text" placeholder="search.." name="search"/>
      </div>
    );
  }
}

export default SearchedProducts;
