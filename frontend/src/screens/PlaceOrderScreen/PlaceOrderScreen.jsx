import React, { useEffect } from "react";
import "./PlaceOrderScreen.scss";
import Message from "../../components/Message/Message";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { clearCartItems } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log(res);
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="placeOrderContainer">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="order">
        <div className="orderDetails">
          <div className="orderDetailsCard">
            <h1>Shipping</h1>
            <p>Address: {cart.shippingAddress.address}</p>
          </div>
          <div className="orderDetailsCard">
            <h1>Payment Method</h1>
            <p>Method: {cart.paymentMethod}</p>
          </div>
          <div className="orderItems">
            <h1>Order Items</h1>
            {cart.cartItems.map((item) => (
              <div className="orderItem" key={item._id}>
                <div className="orderItemDetail">
                  <img src={item.image} />
                  <Link
                    to={`/product/${item._id}`}
                    className="orderItemHeading"
                  >
                    {item.name}
                  </Link>
                </div>
                <span>
                  {item.qty} X {item.price} = {item.price * item.qty}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="orderSummary">
          <h1>Order Summary</h1>
          <div className="summaryItem">
            <span className="summaryItemName">Items:</span>
            <span>{cart.itemsPrice}</span>
          </div>
          <div className="summaryItem">
            <span className="summaryItemName">Shipping:</span>
            <span>{cart.shippingPrice}</span>
          </div>
          <div className="summaryItem">
            <span className="summaryItemName">Tax:</span>
            <span>{cart.taxPrice}</span>
          </div>
          <div className="summaryItem">
            <span className="summaryItemName">Total:</span>
            <span>{cart.totalPrice}</span>
          </div>
          {error && <Message variant="failure">{error}</Message>}
          <button
            onClick={placeOrderHandler}
            className={cart.cartItems.length === 0 ? "disabled" : ""}
            disabled= {cart.cartItems.length === 0}
          >
            Place Order
          </button>
          {isLoading && <Loader/>}
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
