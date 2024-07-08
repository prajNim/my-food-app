import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/NavBar/Navbar'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/cart'
import Placeorder from './Pages/PlaceOrder/placeorder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const[showLogin,setShowLogin] = useState(false)

  return (
    <>
    <ToastContainer/> 
    { showLogin ? <LoginPopup setShowlogin={setShowLogin}/> : <></> }
    <div className='app'>
   
      <Navbar setShowlogin={setShowLogin}/>
      
      <Routes>
        < Route path='/' element={<Home/>}></Route>
         <Route path='/cart' element={<Cart/>}></Route>
         <Route path='/placeorder' element = {<Placeorder />}></Route>
         <Route path='/verify' element={<Verify />}/>
         <Route path='/myorders' element={<MyOrders />}/>
      </Routes>
    </div>
    <Footer></Footer>
    
    </>
    
  )
}

export default App
