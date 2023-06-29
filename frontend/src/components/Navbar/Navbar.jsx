import React, { useState } from "react";
import "./Navbar.scss";
import { FaCaretDown, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import Logo from "../../assets/logo/instashoplogo.png"

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  //Dropdown related
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const toggleAdminDropdown = () => {
    setIsAdminDropdownOpen((prevState) => !prevState);
  };

  console.log(cartItems);
  return (
    <div className="navbar">
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="left">
            <img src= {Logo}/>
          </div>
        </Link>
        <div className={`right ${isMenuOpen ? 'show' : ''}`}>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span className="cart">
              <FaShoppingCart />
              Cart
              {cartItems.length > 0 && (
                <div className="badge">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </span>
          </Link>
          {userInfo ? (
            <div className={`navDropdown ${isDropdownOpen ? "open" : ""} `}>
              <span className="dropdownToggle" onClick={toggleDropdown} >
                {userInfo.name}
                <FaCaretDown />
              </span>
              <div className="dropdownMenu">
                <Link to="/profile" className="dropdownItem">
                  Profile
                </Link>
                <div onClick={logoutHandler} className="logoutItem">
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span className="user">
                <FaUser />
                Sign In
              </span>
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div
              className={`navDropdown ${isAdminDropdownOpen ? "open" : ""} `}
            >
              <span className="dropdownToggle" onClick={toggleAdminDropdown}>
                Admin
                <FaCaretDown />
              </span>
              <div className="dropdownMenu">
                <Link to="/admin/orderlist" className="dropdownItem">
                  Orders
                </Link>
                <Link to="/admin/userlist" className="dropdownItem">
                  Users
                </Link>
                <Link to="/admin/productlist" className="dropdownItem">
                  Products
                </Link>
              </div>
            </div>
          )}
        </div>
        <div
          className={`navbar-hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
