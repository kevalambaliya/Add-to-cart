import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts, removeFromCart, updateQuantity } from "../redux/Slice/Cart";

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
  });
  const { carts } = useSelector((store) => store.carts);
  console.log(carts);

  const handledelete = async (id) => {
    try {
      await dispatch(removeFromCart(id)).unwrap();
      alert("cart deleted");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleQnt =async (opr,id, qnt) => {
   try {
     if(opr == "+"){
       let data= {
         id,
         qnt: qnt + 1,
       }
       await dispatch(updateQuantity(data)).unwrap();
     }
     else{
       let data = {
         id,
         qnt: qnt - 1,
       }
       await dispatch(updateQuantity(data)).unwrap();
     }
   } catch (error) {
    alert(error.message);
   }
  }

  return (
    <div style={{ display: "flex", margin: "10px 10px" }}>
      {carts.length > 0 &&
        carts.map((item) => (
          <div style={{ padding: "10px" }}>
            <div className="card" style={{ width: "230px", height: "360px" }}>
              <img src={item.img} alt="" style={{ width: "200px" }} />
              <h5 style={{ marginLeft: "10px" }}>{item.title}</h5>
              <p style={{ marginLeft: "10px" }}>{item.price}</p>
              <div
                style={{
                  display: "flex",
                  marginLeft: "10px",
                  alignItems: "center",
                }}
              >
                <button
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                  onClick={()=> handleQnt("-", item.id , item.qnt)}
                  disabled={item.qnt == 1 ? true : false}
                >
                  -
                </button>
                <h5 style={{ margin: "0px 10px" }}>{item.qnt}</h5>
                <button
                  style={{
                    width: "30px",
                    height: "30px",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                  onClick={()=> handleQnt("+", item.id , item.qnt)}
                >
                  +
                </button>
                <h6 style={{marginLeft:"10px",display:"flex",alignContent:"center",marginTop:"5px"}}>Total : {item.price * item.qnt}</h6>
              </div>
              <button
                style={{
                  width: "70px",
                  height: "30px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  marginLeft: "10px",
                  marginTop: "15px",
                }}
                onClick={() => handledelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Cart;
