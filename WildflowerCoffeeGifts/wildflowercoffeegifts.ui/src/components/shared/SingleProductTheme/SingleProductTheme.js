import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProductTheme.scss';

class SingleProductTheme extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <div className='SingleProductTheme'>
         <li className= "list-group-item">
          <div>
           <h2 className="theme-name">{theme.theme} ({theme.count})</h2>
          </div>
      <Link to ={`/products/${theme.topThreeProducts[0].id}`}><h5>{theme.topThreeProducts[0].title}</h5></Link>
      <Link to ={`/products/${theme.topThreeProducts[1].id}`}><h5>{theme.topThreeProducts[1].title}</h5></Link>
      <Link to ={`/products/${theme.topThreeProducts[2].id}`}><h5>{theme.topThreeProducts[2].title}</h5></Link>
      </li>
     </div>
    );
  }
}
export default SingleProductTheme;
