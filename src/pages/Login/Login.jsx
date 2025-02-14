import React, { useState,useEffect } from "react";
import "./Login.css"
import Buttons from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
  
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [logreg, setLogreg] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  let isLogged = localStorage.getItem("isLogged");
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged === "true") {
      navigate("/");
  }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth()
  };
    const handleAuth = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (logreg) {
      // log in
      const user = users.find((u) => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem("loggedInUser", user.username);
        setMessage("Login successful!");
        localStorage.setItem("isLogged", "true");
      } else {
        setMessage("Incorrect credentials");
      }
    } else {
      // account create
      if (users.some((u) => u.username === username)) {
        setMessage("The user already exists");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("Account successfully created!");
        setLogreg(true);
        setUsername("");
        setPassword("");
      }
    }};
  return (
   <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{logreg ? "Login" : "Create an account"}</h2>
      <Box className="inputlog" noValidate autoComplete="off">
          <TextField className="textfieldd" type="text" label="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </Box>
      <br />
      <Box className="inputlog" noValidate autoComplete="off">
        <TextField className="textfieldd" type={showPassword ? 'text' : 'password'} label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          slotProps={{input: { endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
            </InputAdornment>),},}}/>
      </Box>
      <br />
      <Buttons className="loginsignupbutton" type="submit" color="success" sx={{ textTransform: "none" }} variant="contained" onClick={handleSubmit}>
       {logreg ? "Log in" : "Sign up"}
      </Buttons>

      <p className="logtxt" onClick={() => setLogreg(!logreg)}>
        {logreg ? "Don't have an account yet? Sign up" : "Already have an account? Log in"}
      </p>
      <p className="login-message">{message}</p>
    </form>
   </div>
  );
};

export default Login;