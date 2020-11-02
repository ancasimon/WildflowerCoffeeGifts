import React from 'react';
import './Products.scss';
import productsData from '../../../helpers/data/productsData';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';
// import { Link } from 'react-router-dom';

class Products extends React.Component {
  state = { products: [] };

  componentDidMount() {
    productsData.getAllProducts()
      .then((products) => { this.setState({ products }); });
  }

  render() {
    const { products } = this.state;
    const buildProducts = products.map((product) => (<SingleProduct key={product.id} product={product}/>));
    return (
            <div>
             {buildProducts}
            </div>
    );
  }
}

export default Products;
