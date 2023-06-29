import React, { useState } from "react";
import "./ShippingScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../slices/cartSlice";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="shippingContainer">
			<CheckoutSteps step1 step2 />
      <div className="shippingForm">
        <div className="shippingHeading">Shipping</div>
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter Address"
            required
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <input
            type="text"
            placeholder="Enter City"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <input
            type="text"
            placeholder="Enter Country"
            required
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          />
          <input
            type="text"
            placeholder="Enter Postal Code"
            required
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
