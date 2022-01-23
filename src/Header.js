import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://www.doorwaysva.org/wp-content/uploads/2019/06/amazon-logo.png"
          alt=""
        />
      </Link>
      <div className="header_search">
        <input type="text" className="header_searcInput" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && "/Login"}>
          <div onClick={handleAuthentication} className="header_option">
            <span className="header_option_1">
              {!user ? "Guest" : user.email}
            </span>
            <span className="header_option_2">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/Payment">
          <div className="header_option">
            <span className="header_option_1">Return </span>
            <span className="header_option_2"> & Order</span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_option_1"> Your</span>
          <span className="header_option_2">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header_basket">
            <ShoppingCartIcon />
            <span className="header_basket_2  header_basketcount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
