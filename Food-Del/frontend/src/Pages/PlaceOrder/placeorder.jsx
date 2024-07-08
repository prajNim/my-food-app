import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../../context/Storecontext";
import "./placeorder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url ,setShowlogin } =  useContext(Storecontext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }
  // useEffect(() => {
  // console.log(cartItems);
  // },[cartItems])

  const PlaceOrder = async (event) => {
    event.preventDefault();
    try
    {
    let orderItems = [];
    food_list.map(((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })) 

  
    let orderData = {
      address: data,
      item: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
            else {
               console.log("Something Went Wrong")
            }
  }
  catch(error){
    console.log(error)
  }
   // console.log(orderItems);
  }
  const navigate = useNavigate(); 
useEffect(()=>{
if(!token)
{
  
  toast.error("Login or Sign Up");
  navigate('/cart')
}
else if(getTotalCartAmount()===0){
  navigate('/cart')
}
},[token])
  return (
    <form onSubmit={PlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="text"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email address"
        />
        <input
          required
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
          />
          <input
            required
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            placeholder="Zip Code"
          />
          <input
            required
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default placeorder;
