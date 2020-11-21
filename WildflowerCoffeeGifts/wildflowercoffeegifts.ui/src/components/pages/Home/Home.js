import React from 'react';

import PropTypes from 'prop-types';

import ProductThemes from '../ProductThemes/ProductThemes';
import SingleProduct from '../../shared/SingleProduct/SingleProduct';

import productsData from '../../../helpers/data/productsData';

import './Home.scss';

class Home extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = { products: [] };

  componentDidMount() {
    productsData.getTwentyProducts()
      .then((products) => {
        this.setState({ products });
      });
  }

  render() {
    const { products } = this.state;
    const { authed } = this.props;
    const buildTwentyProducts = products.map((product) => (<SingleProduct key={product.id} product={product} authed={authed} />));

    return (
      <div>
         <div className="jumbotron">
          <div className="jumbotronText">
            <h1 className="greeting">Thank you for visiting us at Wildflower Coffee Gifts!</h1>
            <h2 className='aboutUs'>We are a locally-owned floral shop offering gifts for any occasion in reusable coffee mugs!</h2>
          </div>
        </div>
        <br />
        <div className="container twenty-product-view">
          <div className="row">
            <div className="col-3 twenty-product-cat">
             <ProductThemes/>
            </div>
            <div className="col-9 d-flex flex-wrap twenty-product-featured">
              {buildTwentyProducts}
            </div>
            </div>
            </div>
            </div>
    );
  }
}

export default Home;
