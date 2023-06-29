import React from "react";
import "./UserListScreen.scss";
import { useGetUsersQuery, useDeleteUserMutation } from "../../../slices/usersApiSlice";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation()

  console.log(users);
  const deleteHandler= async(id)=> {
    if(window.confirm('Are you sure?')) {
      try {
        await deleteUser(id)
        toast.success('User deleted!')
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

  }
  return (
    <div className="orderListContainer">
      <div className="orderTableContainer">
        <h2>Users</h2>
        {loadingDelete && <Loader/>}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="failure">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="tableWrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{color: 'green'}}/>
                      ) : (
                        <FaTimes style={{color: 'red'}} />
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button><FaEdit/></button>
                      </Link>
                      <button
                        className="delBtn"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash />
                      </button>
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

export default UserListScreen;
