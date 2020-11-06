import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProductTheme.scss';

class SingleProductTheme extends React.Component {
  render() {
    const { theme } = this.props;
    const singleProductLink = '/products';
    return (
      <div className='SingleProductTheme'>
        <li className= "list-group-item m-3">
          <div className ="d-flex">
           <h2 className="theme-name">{theme.theme}</h2>
           <h3 className = 'mr-auto mt-1'> ({theme.count})</h3>
           </div>
          <div className="text-left">
      <Link to ={singleProductLink}><h5>{theme.topThreeProducts[0].title}</h5></Link>
      <Link to ={singleProductLink}><h5>{theme.topThreeProducts[1].title}</h5></Link>
      <Link to ={singleProductLink}><h5>{theme.topThreeProducts[2].title}</h5></Link>
     </div>
     </li>
     </div>
    );
  }
}
export default SingleProductTheme;
