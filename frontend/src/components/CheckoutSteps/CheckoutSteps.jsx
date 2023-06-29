import React from "react";
import "./CheckoutSteps.scss";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="stepsContainer">
      <div className="stepItem">
        <div className="stepNumber">1</div>
        {step1 ? (
          <Link className="stepTextEnabled" to="/login">
            Sign In
          </Link>
        ) : (
          <Link className="stepTextDisabled" to="/login">
            Sign In
          </Link>
        )}
      </div>
      <div className="stepLine"></div>
      <div className="stepItem">
        <div className="stepNumber">2</div>
        {step2 ? (
          <Link className="stepTextEnabled" to="/shipping">
            Shipping
          </Link>
        ) : (
          <Link className="stepTextDisabled" to="/shipping">
            Shipping
          </Link>
        )}
      </div>
      <div className="stepLine"></div>
      <div className="stepItem">
        <div className="stepNumber">3</div>
        {step3 ? (
          <Link className="stepTextEnabled" to="/payment">
            Payment
          </Link>
        ) : (
          <Link className="stepTextDisabled" to="/payment">
            Payment
          </Link>
        )}
      </div>
      <div className="stepLine"></div>
      <div className="stepItem">
        <div className="stepNumber">4</div>
        {step4 ? (
          <Link className="stepTextEnabled" to="/placeorder">
            Place Order
          </Link>
        ) : (
          <Link className="stepTextDisabled" to="/placeorder">
            Place Order
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
