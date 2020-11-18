import React from 'react';
import productThemeData from '../../../helpers/data/productThemeData';
import SingleProductTheme from '../../shared/SingleProductTheme/SingleProductTheme';
import './ProductThemes.scss';

class ProductThemes extends React.Component {
  state = { themes: [] };

  componentDidMount() {
    productThemeData.getThemeThreeProducts()
      .then((themes) => {
        this.setState({ themes });
      });
  }

  render() {
    const { themes } = this.state;
    const buildProductThemes = themes.map((theme) => (<SingleProductTheme key={theme.id} theme={theme}/>));
    return (
    // <div className="d-flex flex-wrap justify-content-between">
    <div>
      <h5 className="product-cat-title">Product Categories</h5>
    {buildProductThemes}
  </div>
    );
  }
}
export default ProductThemes;
