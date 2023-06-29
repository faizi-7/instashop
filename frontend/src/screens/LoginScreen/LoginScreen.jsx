import React, { useState, useEffect } from "react";
import "./LoginScreen.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import {toast} from 'react-toastify'
import { useLoginMutation } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader/Loader";


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

	const dispatch= useDispatch()
	const navigate= useNavigate()

	const [login, {isLoading}]= useLoginMutation()

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
		try {
			const res= await login({email, password}).unwrap()
      console.log(res)
			dispatch(setCredentials({...res}))
			navigate(redirect)
		} catch(err) {
			toast.error(err?.data?.message || err.error)
		}
  };
  return (
    <div className="loginContainer">
      <div className="loginForm">
        <div className="loginHeading">Login</div>
        <form action="" onSubmit={submitHandler}>
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
          <button type="submit" disabled={isLoading}>Login</button>
					{ isLoading && <Loader/>}
        </form>
        <span>
          Don't you have an account?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="link">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginScreen;
