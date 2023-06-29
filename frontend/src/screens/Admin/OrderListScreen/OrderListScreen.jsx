import React from "react";
import "./OrderListScreen.scss";
import { useGetOrdersQuery } from "../../../slices/ordersApiSlice";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);
  return (
    <div className="orderListContainer">
      <div className="orderTableContainer">
        <h2>Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="failure">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="tableWrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>$ {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button>Details</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListScreen;
