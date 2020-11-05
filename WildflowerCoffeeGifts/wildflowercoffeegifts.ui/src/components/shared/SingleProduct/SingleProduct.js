import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProduct.scss';

class SingleProduct extends React.Component {
  render() {
    const { product } = this.props;
    const singleProductLink = `/products/${product.id}`;
    return (
      <div>
      <div className= 'card'>
      <div className= 'card-title'>
        <h4 className= "title mt-3">{product.title}</h4>
       </div>
         <img src={product.imageUrl} className= "card-img-top" alt="product"/>
         <div className="card-body text-center">
           <p>Price: ${product.price}</p>
           <p>Description: {product.description}</p>
           <p>Quantities Available: {product.quantityAvailable}</p>
           <Link to={singleProductLink}>View Details</Link>
         </div>
      </div>
      </div>

    );
  }
}
export default SingleProduct;
