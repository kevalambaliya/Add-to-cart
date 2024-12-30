import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/Slice/User";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  return (
    <div id="nav">
      <div className="linkbar">
      <Link to="/" className="link">Home</Link>
      <Link to="/cart" className="link">Cart</Link>
      
      <Link to="/add-product" className="link">Add Product</Link>
      <Link to="/product" className="link">Product</Link>
      {user.username ? (
        <>
          <Link to="/login" className="link" onClick={() => dispatch(logout())}>
            logOut
          </Link>
          <Link className="link">{user.username}</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="link">Login</Link>
          <Link to="/signup" className="link">Signup</Link>
        </>
      )}
      </div>
    </div>
  );
};

export default Navbar;
