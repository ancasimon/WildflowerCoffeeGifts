import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProduct.scss';

class SingleProduct extends React.Component {
  render() {
    const { product } = this.props;
    const singleProductLink = `/products/${product.id}`;
    return (
      <div className="col-4 p-1">
      <div className='card'>
      <div className='card-title'>
        <h6 className= "title mt-3">{product.title}</h6>
       </div>
         <img src={product.imageUrl} className= "productImage center card-img-top" alt="product"/>
         <div className="card-body text-center">
           <p>Price: ${product.price}</p>
           {/* <p>Description: {product.description}</p> */}
           <p>Quantity Available: {product.quantityAvailable}</p>
           <Link to={singleProductLink} className="wcgButton p-2">View Details</Link>
         </div>
      </div>
      </div>

    );
  }
}
export default SingleProduct;
