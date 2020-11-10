import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProduct.scss';

class SingleProduct extends React.Component {
  render() {
    const { product } = this.props;
    const singleProductLink = `/products/${product.id}`;
    return (
      <div>
      <div className='card'>
       <img src={product.imageUrl} className= "card-img-top" alt="product"/>
         <div className="card-body text-center">
         <Link to={singleProductLink}><i class="fas fa-info-circle"></i></Link>
           <p>Price: ${product.price}</p>
           <p>Quantities Available: {product.quantityAvailable}</p>
           <p className="title">{product.title}</p>
         </div>
      </div>
      </div>
    );
  }
}
export default SingleProduct;
