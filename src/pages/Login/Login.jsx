import React, { useState,useEffect } from "react";
import "./Login.css"
import Buttons from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
  
const Login = ({ setIsLogin,isLoggin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [logreg, setLogreg] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if(isLoggin){
      window.location.href = "/";
    }
  },[isLoggin])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuth()
  };

    const handleAuth = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (logreg) {
      // log in
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        setMessage("Connexion réussie !");
        setIsLogin(true);
      } else {
        setMessage("Identifiants incorrects");
      }
    } else {
      // account create
      if (users.some((u) => u.email === email)) {
        setMessage("L'utilisateur existe déjà");
      } else {
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("Compte créé avec succès !");
        setLogreg(true);
        setEmail("");
        setPassword("");
      }
    }};
  return (
   <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{logreg ? "Connexion" : "Inscription"}</h2>
      <Box className="inputlog" noValidate autoComplete="off">
              <TextField type="text" label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Box>
      <br />
      <Box className="inputlog" noValidate autoComplete="off">
              <TextField type={showPassword ? 'text' : 'password'} label="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                InputProps={{ endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>),}}/>
      </Box>
      <br />
      

      <Buttons type="submit" color="success" sx={{ textTransform: "none" }} variant="contained" onClick={handleSubmit}>
       {logreg ? "Se connecter" : "Créer un compte"}
      </Buttons>

      <p className="logtxt" onClick={() => setLogreg(!logreg)}>
        {logreg ? "Pas encore de compte ? Inscrivez-vous" : "Déjà un compte ? Connectez-vous"}
      </p>

      <p className="login-message">{message}</p>
    </form>
   </div>
  );
};

export default Login;