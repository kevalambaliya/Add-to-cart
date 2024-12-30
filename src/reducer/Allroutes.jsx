import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Product from '../pages/Product'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import PrivateRoute from './Privaterouter'
import Addproduct from '../pages/Addproduct'

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/add-product' element={<Addproduct/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default Allroutes
