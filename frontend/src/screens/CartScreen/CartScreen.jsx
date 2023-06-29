import React from "react";
import "./CartScreen.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message/Message.jsx";
import "./CartScreen.scss";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler= (product, qty)=> {
    dispatch(addToCart({...product, qty}))
  }
  const removeFromCartHandler= (id)=> {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler= ()=> {
    navigate('/login?redirect=/shipping')
  }
  return (
    <div className="cartScreen">
      {cartItems.length === 0 ? (
        <Message variant="failure">
          Your cart is empty
          <Link to="/" style={{ color: "rgb(212, 12, 12)", paddingLeft: "12px"}}>
            Go Back
          </Link>
        </Message>
      ) : (
        <div className="cartItems">
          <div className="heading">Shopping Cart</div>
          {cartItems.map((item)=> ( 
            <div className="cartItem" key={item._id}>
              <div className="cartImage"><img src={item.image} alt= {item.name}/></div>
              <div className="cartTitle"><Link to={`/product/${item._id}`}>{item.name}</Link></div>
              <div className="cartPrice">$ {item.price}</div>
              <select
                      id="quantity"
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                      {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                          {x + 1}
                          </option>
                      ))}
              </select>
              <button onClick={()=> removeFromCartHandler(item._id)}><FaTrash/></button>
            </div>
          ))}
        </div>
      )}
      <div className="cartCheckoutCard">
          <div className="cardHeading">Subtotal {cartItems.reduce((acc, item)=> acc= acc+item.qty, 0)} Items</div>
          <div className="cardPrice">$ {cart.itemsPrice}</div>
          <div className="divider"></div>
          <button type="button" className={cartItems.length === 0 ? "disabled": ""} onClick={checkoutHandler}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartScreen;
