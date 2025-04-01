import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import instance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const [errMessage, setErrMessage] = useState("");

  const handleLoginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("api/auth/login", {
        email,
        password,
      });

      const token = response.data.accessToken;
      console.log(token);

      if (token) {
        login(token);
        navigate("/home");
      } else {
        console.error("Token not found in repsonse", response.data);
        setErrMessage(error.response.data.error);
      }
    } catch (error) {
      if (error) {
        setErrMessage(error.response.data.error);
      }
    }
  };
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div>
          <h1 className='mb-6 text-3xl'>Login</h1>
          <form
            className='w-full max-w-sm p-6 bg-white rounded shadow-md'
            onSubmit={handleLoginUser}
          >
            <label className='block mb-2' htmlFor='email'>
              Email
            </label>
            <input
              className='w-full p-2 mb-4 border rounded'
              type='text'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className='block mb-2' htmlFor='password'>
              Password
            </label>
            <input
              className='w-full p-2 mb-4 border rounded'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className='w-full px-4 py-2 text-white bg-blue-500 rounded blue-button hover:bg-blue-700'
              type='submit'
            >
              Login
            </button>
            {errMessage && <div className='text-red-500'>{errMessage}</div>}
          </form>
        </div>
        <div>
          <p>
            Don't have an account? Register{" "}
            <a className='text-blue-700' href='/register'>
              here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
