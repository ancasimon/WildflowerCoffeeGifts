import React from 'react';
import './SingleProduct.scss';

class SingleProduct extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <ul>
          <li>{product.id} </li>
          <li>{product.title} </li>
          <li>{product.description} </li>
          <li>Price: ${product.price} </li>
          <li>{product.datecreated} </li>
          <li>QTY:{product.quantityavailable} </li>
        </ul>

      </div>
    );
  }
}
export default SingleProduct;
