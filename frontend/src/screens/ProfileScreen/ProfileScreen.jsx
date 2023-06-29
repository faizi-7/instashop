import React, { useEffect, useState } from "react";
import "./ProfileScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../slices/authSlice";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile Updated Successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    console.log("Submit");
  };

  return (
    <div className="profileScreen">
      <div className="updateContainer">
        <div className="loginForm">
          <div className="loginHeading">User Profile</div>
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <button type="submit">Update</button>

            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
      <div className="orderHistoryContainer">
        <h2>My Orders</h2>
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
                        order.DeliveredAt.substring(0, 10)
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

export default ProfileScreen;
