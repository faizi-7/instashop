import React, { useEffect, useState } from "react";
import "./UserEditScreen.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../../slices/usersApiSlice";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  ``;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated");
      refetch();
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="productEditContainer">
      <Link to="/admin/userlist">
        <button>Back</button>
      </Link>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varinat="failure">{error}</Message>
      ) : (
        <div className="productEditForm">
          <div className="loginForm">
            <div className="loginHeading">Edit User</div>
            <form action="" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="checkbox"
                label="Is Admin"
                onChange={(e) => setIsAdmin(e.target.value)}
                checked={isAdmin}
              />
              <button type="submit" disabled={isLoading}>
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEditScreen;
