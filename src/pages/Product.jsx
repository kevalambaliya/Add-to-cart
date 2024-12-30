import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/Slice/Product";
import ProductCard from "../component/Productcart";
import { fetchCarts } from "../redux/Slice/Cart";


const Products = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCarts());
  },[]);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  let {products}=useSelector((store)=>store.product)
  console.log(products);
  
  return <div style={{display:"flex"}}>
    {
      products.length > 0 &&
      products.map((ele) => <ProductCard {...ele} key={ele.id} />)}
  </div>;
};

export default Products;

