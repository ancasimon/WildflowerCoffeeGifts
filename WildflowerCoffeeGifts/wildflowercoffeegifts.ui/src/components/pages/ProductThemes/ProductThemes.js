import React from 'react';
import productThemeData from '../../../helpers/data/productThemeData';
import SingleProductTheme from '../../shared/SingleProductTheme/SingleProductTheme';

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
  <div className="d-flex flex-wrap">
    {buildProductThemes}
  </div>
    );
  }
}
export default ProductThemes;
