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
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  searchProducts = () => {
    console.error();
  }

  render() {
    const { isOpen } = this.state;

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
          <NavItem>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
