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

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    searchInput: '',
    // wordSearched: `/products/search/${this.searchInput}`,
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

    return (
      <div className="MyNavbar">
      <Navbar expand="md">
        <div className="wfc">
          <NavbarBrand tag={RRNavLink} to="/home" className='ml-3' >Wildflower Coffee Gifts🌼</NavbarBrand>
        </div>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto NavList" navbar>
          <NavItem className="NavItem">
            <NavLink tag={RRNavLink} to="/products">Products</NavLink>
          </NavItem>
          <NavItem className="NavItem">
            <NavLink tag={RRNavLink} to="/orders">Orders</NavLink>
          </NavItem>
          <NavItem className="NavItem">
            <NavLink tag={RRNavLink} to="/cart">Cart</NavLink>
          </NavItem>
          <NavItem className="NavItem">
            <button className="btn btn-light">Log In</button>
          </NavItem>
          <form className='searchbar'>
              <input className='searchInput' onChange={this.filterProducts} type="text" placeholder="Search Products" name="search" value={this.state.searchInput}/>
              <Link className='searchButton' to={wordSearched} searchinput={this.state.searchInput}><i className="fa fa-search"></i></Link>
          </form>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
