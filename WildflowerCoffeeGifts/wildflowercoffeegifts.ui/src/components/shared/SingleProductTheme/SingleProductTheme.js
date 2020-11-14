import React from 'react';
import { Link } from 'react-router-dom';
import {
  Select, MenuItem, FormControl, InputLabel,
} from '@material-ui/core';
import './SingleProductTheme.scss';

class SingleProductTheme extends React.Component {
  state = {
    theme: '',
    value: '',
  };

   handleChange = (e) => {
     this.setState(e.target.value);
   }

   render() {
     const { theme } = this.props;
     const { value } = this.state;
     return (
      <div className='SingleProductTheme'>
       <FormControl className="form-box">
        <InputLabel className="theme-name">{theme.theme} ({theme.count})</InputLabel>
        <Select className="select-box" onChange= {this.handleChange}>
      <MenuItem value={theme} className="product-item"><Link to ={`/products/${theme.topThreeProducts[0].id}`}>{theme.topThreeProducts[0].title}</Link></MenuItem>
      <MenuItem value={theme} className="product-item"><Link to ={`/products/${theme.topThreeProducts[1].id}`}>{theme.topThreeProducts[1].title}</Link></MenuItem>
      <MenuItem value={theme} className="product-item"><Link to ={`/products/${theme.topThreeProducts[2].id}`}>{theme.topThreeProducts[2].title}</Link></MenuItem>
      </Select>
      </FormControl>
      <p>{ value }</p>
     </div>
     );
   }
}
export default SingleProductTheme;
