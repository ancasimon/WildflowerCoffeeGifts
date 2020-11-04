import React from 'react';
import './SingleProductTheme.scss';

class SingleProductTheme extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <div className='SingleProductTheme'>
        <li className= "list-group-item m-3 d-flex">
           <h2 className="theme-name">{theme.theme} ({theme.count})</h2>
        </li>
      </div>
    );
  }
}
export default SingleProductTheme;
