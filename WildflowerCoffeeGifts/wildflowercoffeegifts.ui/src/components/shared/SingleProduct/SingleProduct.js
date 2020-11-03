import React from 'react';
import './SingleProduct.scss';

class SingleProduct extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div>
       <div className= 'row my-4'>
       <div className= 'col-sm d-flex flex-wrap'>
       <div className= 'card m-3'>
       <div className= 'card-title'>
         <h4 className= "title mt-3">{product.title}</h4>
        </div>
          <img src={product.imageurl} className= "card-img-top" alt="product"/>
          <div className="card-body text-center">
            <p>Price: ${product.price}</p>
            <p>Description:{product.description}</p>
            <p>Quantity Available:{product.quantityavailable}</p>
          </div>
       </div>
       </div>
       </div>
      </div>
    );
  }
}
export default SingleProduct;
