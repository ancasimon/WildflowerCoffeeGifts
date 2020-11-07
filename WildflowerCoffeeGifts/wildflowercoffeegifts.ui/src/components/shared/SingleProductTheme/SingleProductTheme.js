import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProductTheme.scss';

class SingleProductTheme extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <div className='SingleProductTheme'>
        <li className= "list-group-item m-3">
          <div className ="d-flex">
           <h2 className="theme-name">{theme.theme}</h2>
           <h3 className = 'mr-auto mt-1'> ({theme.count})</h3>
           </div>
          <div className="text-left">
      <Link to ={`/products/${theme.topThreeProducts[0].id}`}><h5>{theme.topThreeProducts[0].title}</h5></Link>
      <Link to ={`/products/${theme.topThreeProducts[1].id}`}><h5>{theme.topThreeProducts[1].title}</h5></Link>
      <Link to ={`/products/${theme.topThreeProducts[2].id}`}><h5>{theme.topThreeProducts[2].title}</h5></Link>
     </div>
     </li>
     </div>
    );
  }
}
export default SingleProductTheme;
