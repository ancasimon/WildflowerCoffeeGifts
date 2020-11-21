import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import PropTypes from 'prop-types';

import './MyNavbar.scss';
import authData from '../../../helpers/data/authData';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
    searchInput: '',
  }

  filterProducts = (e) => {
    e.preventDefault();
    this.setState({ searchInput: e.target.value });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;

    const searchWord = this.state.searchInput;
    const wordSearched = `/products/search/${searchWord}`;

    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <Nav className="ml-auto NavList" navbar>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/home" className='listItems'>Home</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/products" className='listItems'>Products</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/orders" className='listItems'>Orders</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/cart" className='listItems'>Cart</NavLink>
            </NavItem>
            <NavItem className="NavItem">
              <NavLink tag={RRNavLink} to="/login" className='listItems'>Log In</NavLink>
            </NavItem>
            <form className='searchbar'>
              <input className='searchInput mr-2' onChange={this.filterProducts} type="text" placeholder="Search Products" name="search" value={this.state.searchInput}/>
              <Link className='searchButton listItems' to={wordSearched} searchinput={this.state.searchInput}><i className="fa fa-search"></i></Link>
            </form>
          </Nav>
        );
      }
      return <Nav className="ml-auto NavList" navbar>
          <NavItem className="NavItem">
            <NavLink tag={RRNavLink} to="/home" className='listItems'>Home</NavLink>
          </NavItem>
          <NavItem className="NavItem">
            <NavLink tag={RRNavLink} to="/products" className='listItems'>Products</NavLink>
          </NavItem>
          <NavItem className="NavItem">
            <NavLink tag={RRNavLink} to="/login" className='listItems'>Log In</NavLink>
          </NavItem>
          <form className='searchbar'>
            <input className='searchInput mr-2' onChange={this.filterProducts} type="text" placeholder="Search Products" name="search" value={this.state.searchInput}/>
            <Link className='searchButton listItems' to={wordSearched} searchinput={this.state.searchInput}><i className="fa fa-search"></i></Link>
          </form>
        </Nav>;
    };

    return (
      <div className="MyNavbar">
      <Navbar expand="md">
        <div className="wfc">
          <NavbarBrand tag={RRNavLink} to="/home" className='ml-3 active' >Wildflower Coffee Gifts🌼</NavbarBrand>
        </div>
        <NavbarToggler className='toggleButton' onClick={this.toggle}>
          <p className='m-auto p-1'><i class="fas fa-bars"></i></p>
          </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
        { buildNavbar() }
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
