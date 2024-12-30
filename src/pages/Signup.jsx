import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { createUser } from "../redux/Slice/User";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let {name,value} = e.target;
    setUserDetails({...userDetails, [name]: value});
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await dispatch(createUser(userDetails)).unwrap();

      toast.success('🦄 User Created !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        navigate("/")
    } catch (error) {
      toast.error('🦄 Wow so easy!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }
  return (
    <div className="signup-container">
    <form className="signup-form" onSubmit={onSubmit}>
      <input
      className="mt"
        type="text"
        name="username"
        placeholder="Username"
        value={userDetails.username}
        onChange={handleChange}
      />
      <input
       className="mt"
        type="email"
        name="email"
        placeholder="Email"
        value={userDetails.email}
        onChange={handleChange}
      />
      <input
       className="mt"
        type="text"
        name="password"
        placeholder="Password"
        value={userDetails.password}
        onChange={handleChange}
      />
      <button type="submit" className="form-button mt">Create Account</button>
      <ToastContainer />
    </form>
  </div>
  );
};

export default Signup;
