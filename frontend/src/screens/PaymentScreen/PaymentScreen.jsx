import React, { useEffect, useState } from "react";
import "./PaymentScreen.scss";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch= useDispatch()
  const navigate= useNavigate()

  const cart= useSelector(state=> state.cart)
  const { shippingAddress }= cart

  useEffect(()=> {
    if(!shippingAddress) navigate('/shipping')
  }, [shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  };

  return (
    <div className="paymentContainer">
      <CheckoutSteps step1 step2 step3 />
      <div className="paymentForm">
        <div className="paymentHeading">Shipping</div>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="PayPal" className="radioLabel">
            <input
                type="radio"
                id="PayPal"
                name="Payment Method"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal or Credit Card
          </label>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
