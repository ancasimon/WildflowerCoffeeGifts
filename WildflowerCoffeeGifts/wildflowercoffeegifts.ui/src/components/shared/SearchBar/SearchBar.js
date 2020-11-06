import { resetWarningCache } from 'prop-types';
import React from 'react';
import './SearchBar.scss';
import productsData from '../../../helpers/data/productsData';

class SearchBar extends React.Component {
  filterProducts = (e) => {
    console.error(e.target.value);
    const filter = this.state.search;
    if (filter !== '') {
      productsData.getSearchedProducts(filter)
        .then((response) => { this.setState({ filteredProducts: response }); });
    }
  }

  render() {
    return (
      <div>
         <label htmlFor="search"><i class="fa fa-search"></i></label>
         <input type="text" placeholder="Search Products" name="search" value={this.state.search} onChange={this.filterProducts}/>
      </div>
    );
  }
}

export default { SearchBar };
