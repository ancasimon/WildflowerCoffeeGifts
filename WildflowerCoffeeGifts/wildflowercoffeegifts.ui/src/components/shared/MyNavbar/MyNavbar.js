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
import SearchedProducts from '../../pages/SearchedProducts/SearchedProducts';
// import productsData from '../../../helpers/data/productsData';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    searchInput: '',
    // wordSearched: `/products/search/${this.searchInput}`,
  }

  filterProducts = (e) => {
    e.preventDefault();
    this.setState({ searchInput: e.target.value });
    console.error(this.state.searchInput);
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
              <input type="text" placeholder="Search Products" name="search" value={this.state.searchInput} onChange={this.filterProducts}/>
              <Link to={wordSearched} searchInput={this.state.searchInput}><button><i className="fa fa-search"></i></button></Link>
          </form>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
