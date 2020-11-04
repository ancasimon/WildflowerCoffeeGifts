import React from 'react';
import ProductThemes from '../ProductThemes/ProductThemes';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div>
      <h1>Product Themes</h1>
        <ProductThemes/>
    </div>
    );
  }
}

export default Home;
