import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Loginuser } from "../redux/Slice/User";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await dispatch(Loginuser(userDetails)).unwrap();

      toast.success("🦄 User Logged In !", {
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
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("🦄 User Does not !", {
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
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={onSubmit}>
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
        <input type="submit" value="Login" className="form-button mt" />

        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
