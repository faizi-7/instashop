import React, { useEffect } from "react";
import "./OrderScreen.scss";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  
  const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation()


  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(()=> {
    if(!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async()=> {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          }
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
      }
      if(order && !order.isPaid) {
        if(!window.paypal) {
            loadPayPalScript()
        }
      }

    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details){
      try {
        await payOrder({orderId, details})
        refetch()
        toast.success('Payment Successful!')
      } catch(err) {
        toast.error(err?.data?.message || err.message)
      }
    })
  }
  async function onApproveTest() {
    await payOrder({orderId, details: { payer: {} }})
    refetch()
    toast.success('Payment Successful!')
  }
  function onError(err) {
    toast.error(err.message)
  }
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          }
        }
      ]
    })
    .then((orderId)=> {
      return orderId
    })
  }


  console.log(order);

  const deliverOrderHandler =async()=> {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order Delivered')

    } catch(err) {
      toast.error(err?.data?.message || err.message)
    }

  }

  
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="failure">{error}</Message>
  ) : (
    <div className="orderContainer">
      <h1>Order {order._id}</h1>
      <div className="order">
        <div className="orderDetails">
          <div className="orderDetailsCard">
            <h1>Shipping</h1>
            <p>
              <strong>Name:</strong> {order.user.name}
            </p>
            <p>
              <strong>Email ID:</strong> {order.user.email}
            </p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant="success">
                Delivered at {order.deliveredAt}
              </Message>
            ) : (
              <Message variant="failure">Not Delivered</Message>
            )}
          </div>
          <div className="orderDetailsCard">
            <h1>Payment Method</h1>
            <p>Method: {order.paymentMethod}</p>
            {order.isPaid ? (
              <Message variant="success">Paid at {order.paidAt}</Message>
            ) : (
              <Message variant="failure">Not Paid</Message>
            )}
          </div>
          <div className="orderItems">
            <h1>Order Items</h1>
            {order && order.orderItems && order.orderItems.map((item) => (
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
            <span>{order.itemsPrice}</span>
          </div>
          <div className="summaryItem">
            <span className="summaryItemName">Shipping:</span>
            <span>{order.shippingPrice}</span>
          </div>
          <div className="summaryItem">
            <span className="summaryItemName">Tax:</span>
            <span>{order.taxPrice}</span>
          </div>
          <div className="summaryItem">
            <span className="summaryItemName">Total:</span>
            <span>{order.totalPrice}</span>
          </div>
          {!order.isPaid && (
            <div className="payButton">
              
              {loadingPay && <Loader/>}
              {isPending ? <Loader/> : (
                <>
                  <button onClick={onApproveTest}>Test Pay Order</button>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </>
              )}
            </div>
          )}
          {isLoading && <Loader />}
          {loadingDeliver && <Loader/>}
          { userInfo && userInfo.isAdmin && order.isPaid && !order.isDeliverd && (
            <button onClick={deliverOrderHandler}>
              Mark as Delivered
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
