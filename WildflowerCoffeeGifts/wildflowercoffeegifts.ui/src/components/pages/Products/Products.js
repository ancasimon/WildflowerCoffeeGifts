import React from 'react';
import { Link } from 'react-router-dom';

import './Products.scss';

class Products extends React.Component {
  render() {
    // const selectedProduct = this.props;
    const singleProductLink = '/products/2';
    return (
            <div>
                Products Page

                <p>Placeholder: Link to a single product view</p>
                <p>(this link will eventually go in the single product card layout component):</p>
                <p>(and it will pass down the product object id in props .... I think)</p>
                <Link to={singleProductLink}>Link to Single Product View</Link>
            </div>
    );
  }
}

export default Products;
