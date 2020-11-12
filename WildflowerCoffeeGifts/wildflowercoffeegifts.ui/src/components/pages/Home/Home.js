import React from 'react';
import ProductThemes from '../ProductThemes/ProductThemes';
import productsData from '../../../helpers/data/productsData';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';

import './Home.scss';

class Home extends React.Component {
  state = { products: [] };

  componentDidMount() {
    productsData.getTwentyProducts()
      .then((products) => {
        this.setState({ products });
      });
  }

  render() {
    const { products } = this.state;
    const buildTwentyProducts = products.map((product) => (<SingleProduct key={product.id} product={product}/>));

    return (
      <div>
         <div className="jumbotron">
          <div className="jumbotronText">
            <h1 className="greeting">Thank you for visiting us at Wildflower Coffee Gifts!</h1>
            <h2 className='aboutUs'>We are a locally owned floral shop offering gifts for any occasion in reusable coffee mugs!</h2>
          </div>
        </div>
        <div className='homeContent'>
         <h1> Latest Products</h1>
          <div className="d-flex flex-wrap">
            {buildTwentyProducts}
          </div>
          <div>
          <h1 className="text-center">Product Themes</h1>
            <ProductThemes/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
