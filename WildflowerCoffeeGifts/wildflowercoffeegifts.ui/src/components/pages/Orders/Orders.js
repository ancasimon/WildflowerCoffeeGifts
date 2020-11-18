import React from 'react';
import ProductThemes from '../ProductThemes/ProductThemes';
import './Orders.scss';

class Orders extends React.Component {
  render() {
    return (
      <div className="container product-view">
        <h1>Orders Page</h1>
      <div className="row">
        <div className="col-3 product-cat">
         <ProductThemes/>
        </div>
        </div>
        </div>
    );
  }
}

export default Orders;
