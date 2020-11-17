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
    const buildTwentyProducts = products.map((product) => (<SingleProduct key={product.id} product={product} />));

    return (
      <div>
         <div className="jumbotron">
          <div className="jumbotronText">
            <h1 className="greeting">Thank you for visiting us at Wildflower Coffee Gifts!</h1>
            <h2 className='aboutUs'>We are a locally-owned floral shop offering gifts for any occasion in reusable coffee mugs!</h2>
          </div>
        </div>
        <br />
        <div className='homeContent row'>
          <div className="col-3 productsRow">
            <h4 className="ml-auto">PRODUCT CATEGORIES</h4>
            <ProductThemes/>
          </div>
          <div className="col-9 productsRow">
            <h1> Latest Products</h1>
            <div className="d-flex flex-wrap">
              {buildTwentyProducts}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
