import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Login } from "../API";
import axiosInstance from "../API/axios.config";

const LoginPage = () => {
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      password,
    };

    try {
      const response = await Login(data);

      if (response && response.access.token) {
        console.log(response.access.token, response.access.expires)
        localStorage.setItem("token", response.access.token);
        Cookies.set("token", response.access.token, { expires: 7 });
        localStorage.setItem("userId", response.user._id)
        toast.success("Login successful");

        // Set token in headers for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.token}`;

        navigate("/");
      } else {
        toast.error("Login failed, no token returned");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid name or password");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Log in
          </button>
        </div>
      </form>
      <p className="mt-3">
        Don't have an account yet?
        <a href="/signup">Signup</a>
     </p>
     </div>
  );
};

export default LoginPage;
