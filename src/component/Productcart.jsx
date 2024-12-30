import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/Slice/Cart";

const ProductCard = ({ id, title, price, img }) => {
  const dispatch = useDispatch();
  
  const {carts} = useSelector((store) => store.carts);
  const productcart = async () => {
    let data = {
      title: title,
      price:price,
      img: img,
      qnt: 1,
      productId: id,
    }

    let isExits = carts.filter((item) => item.productId == id);
    if (isExits.length == 0) {
      await dispatch(addToCart(data));
      alert("added to cart");
    } else {
      console.log("isExits", isExits);
      alert("alredy added to cart");
      let pro = isExits[0];

      let updateCart = {
        ...pro,
        qnt: pro.qnt + 1,
      };
      dispatch(updateQuantity(updateCart));
    }
  };
  return (
    <div
      className="mt ml"
      style={{
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "10px",
      }}
    >
      <div
       className="card"
        style={{
          width: "230px",
          height: "330px",
          padding: "10px",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <img
          src={img}
          alt=""  
          width="200px"
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <h5>{title}</h5>
        <p >{price}</p>
        <button 
          onClick={productcart}
          style={{
            width: "60px",
            height: "25px",
            borderRadius: "5px",
            border: "1px solid black",
            fontFamily: "sans-serif",
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
