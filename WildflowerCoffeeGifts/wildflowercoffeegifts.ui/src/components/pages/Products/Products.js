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

                Placeholder: Link to a single product view
                (this link will eventually go in the single product card layout component):
                (and it will pass down the product object id in props .... I think)
                <Link to={singleProductLink}>Link to Single Product View</Link>
            </div>
    );
  }
}

export default Products;
