import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { createProduct } from "../redux/Slice/Product";

const AddProduct = () => {
  let [productDetails, setProductDetails] = useState({
    title: "",
    price: "",
    img: "",
  });

  let updateInput = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await dispatch(createProduct(productDetails)).unwrap();

      toast.success("🦄 added product !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={onSubmit}>
        <input
  
          type="text"
          value={productDetails.title}
          onChange={updateInput}
          name="title"
          placeholder="Enter Product Name"
        />
        <input
        className="mt"
          type="number"
          value={productDetails.price}
          onChange={updateInput}
          name="price" 
          placeholder="Enter Product Price" 
        />
        <input
        className="mt"
          type="url"
          value={productDetails.img}
          onChange={updateInput}
          name="img"
          placeholder="Enter Product Image URL"
        />

        <input className="mt" type="submit" value="Add product" />
        <ToastContainer />
      </form>
    </div>
  );
};

export default AddProduct;
