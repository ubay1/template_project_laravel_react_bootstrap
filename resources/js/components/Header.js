import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button,
} from 'reactstrap';

import Cookies from 'js-cookie';
import { BsFillPersonFill } from "react-icons/bs";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  const toggle = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <Navbar color="primary" fixed="top" dark expand="md" className="shadow-sm">
        <Nav>
          <NavLink to="/" className="nav-link text-white p-0 mr-3">Logo</NavLink>
        </Nav>
        <NavbarToggler onClick={toggle} className="border-0"/>
        <Collapse isOpen={isOpen} navbar className="text-white">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/component" className="nav-link"> Pengurus DKM </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/github" className="nav-link"> Alquran Cordoba </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/video" className="nav-link"> Video </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/transaksi" className="nav-link"> Transaksi </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/donasi" className="nav-link"> Donatur </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/foto" className="nav-link"> Foto </NavLink>
            </NavItem>
          </Nav>
          {
            // console.log(typeof Cookies.get('tokenWakaf'))
            
            typeof Cookies.get('tokenWakaf') === undefined || Cookies.get('tokenWakaf') === undefined
            ?
              <Nav>
                <NavLink to="/login" className="btn btn-danger btn-sm nav-link rounded-lg">Login</NavLink>
              </Nav>
            :
              <div className="btn-group">
                <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                  <BsFillPersonFill size={20} />
                </button>
                <div className="dropdown-menu dropdown-menu-left dropdown-menu-md-right dropdown-menu-lg-right">
                  <button className="dropdown-item" type="button">Action</button>
                  <button className="dropdown-item" type="button">Another action</button>
                  <button className="dropdown-item" type="button">Something else here</button>
                </div>
              </div>
          }
        </Collapse>
      </Navbar>
    </div>
  )
}
export default Header;