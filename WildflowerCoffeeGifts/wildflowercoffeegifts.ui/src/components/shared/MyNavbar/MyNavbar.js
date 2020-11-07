import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    searchInput: '',
  }

  setSearchValue = (e) => {
    e.preventDefault();
    this.setState({ searchInput: e.target.value });
    console.error(e.target.value);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const searchInput = this.state.searchValue;
    const wordSearched = `/products/search/:${searchInput}`;
    return (
      <div className="MyNavbar">
      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavbarBrand href="/">Wildflower Coffee Gifts</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto NavList" navbar>
          <NavItem className="NavItem">
            <NavLink tag={RRNavLink} to="/home">Home</NavLink>
          </NavItem>
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
          <form>
            <NavItem className="NavItem">
              <input type="text" placeholder="Search Products" name="search" onChange={this.filterProducts}/>
              <NavLink to={wordSearched} value={this.state.searchInput}><button><i className="fa fa-search"></i></button></NavLink>
            </NavItem>
          </form>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
