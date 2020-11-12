import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProductTheme.scss';

class SingleProductTheme extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <div className='SingleProductTheme'>
        <div className="categorylink"></div>
        <li className= "list-group-item">
        <p className="theme-name">{theme.theme} ({theme.count})</p>
      <Link to ={`/products/${theme.topThreeProducts[0].id}`}><p className="categoryparagraph">{theme.topThreeProducts[0].title}</p></Link>
      <Link to ={`/products/${theme.topThreeProducts[1].id}`}><p className="categoryparagraph">{theme.topThreeProducts[1].title}</p></Link>
      <Link to ={`/products/${theme.topThreeProducts[2].id}`}><p className="categoryparagraph">{theme.topThreeProducts[2].title}</p></Link>
      </li>
     </div>
    );
  }
}
export default SingleProductTheme;
