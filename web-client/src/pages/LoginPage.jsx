import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [credential, setCredential] = useState({
    userName: "",
    password: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    if (!credential.password || !credential.userName) {
      alert("Missing credentials");
      return;
    }
    dispatch(loginUser(credential));
    navigate(nav);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="userName"
          value={credential.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={credential.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
