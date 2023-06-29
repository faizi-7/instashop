import React, { useState, useEffect } from "react";
import "./RegisterScreen.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import {toast} from 'react-toastify'
import { useRegisterMutation } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader/Loader";


const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch= useDispatch()
	const navigate= useNavigate()

	const [register, {isLoading}]= useRegisterMutation()

	const { userInfo }= useSelector((state)=> state.auth)

	const { search }= useLocation()
	const sp= new URLSearchParams(search)
	const redirect= sp.get('redirect') || '/'

	useEffect(()=> {
		if(userInfo) {
			navigate(redirect)
		}
	}, [userInfo, redirect, navigate])

  const submitHandler = async(e) => {
    e.preventDefault();
    if(password!==confirmPassword) {
      toast.error('Passwords dont match!')
    } else {
      try {
        const res= await register({name, email, password}).unwrap()
        console.log(res)
        dispatch(setCredentials({...res}))
        navigate(redirect)
      } catch(err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  };
  return (
    <div className="registerContainer">
      <div className="loginForm">
        <div className="loginHeading">Register</div>
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <button type="submit" disabled={isLoading}>Register</button>
					{ isLoading && <Loader/>}
        </form>
        <span>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="link">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterScreen;
