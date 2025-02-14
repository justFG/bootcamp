import React from "react";
import {useEffect, useState} from "react";
import "./Navbar.css"
import Button from '@mui/material/Button';
import { FiLogOut } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const Navbar = ({isLoggin,logout}) => {
  const navigate = useNavigate();
  const [currentuser, setCurrentuser] = useState("");

   useEffect(() => {
    let loggedInUsername = localStorage.getItem("loggedInUser");
    if(loggedInUsername === "null"){
      setCurrentuser("")
    }else{
      setCurrentuser(loggedInUsername);
    }
    },);
  return (
    <><div className="navbar">

    <div><a className="logo">LOGO</a></div>

    <div><a onClick={() => navigate("/formulaire")} >Create a post</a></div>

    <div></div>
    <div></div>
    

    <div>{isLoggin ? (<><p className="navbar-text" onclick="window.location.href = 'https://watch-anime.fr/settings';">logged as:</p><h3 className="navbar-username">{currentuser}</h3></>) : (<p className="navbar-text"></p>)}</div>

    <div>
    <div className="navlog">
      {isLoggin ? ( <Button
            color="error"
            sx={{ textTransform: 'none' }}
            variant="contained"
            startIcon={<FiLogOut />}
            onClick={logout}
          >
            Logout
          </Button>) : ( <Button
            color="success"
            sx={{ textTransform: 'none' }}
            variant="contained"
            startIcon={<FiLogIn />}
            onClick={logout}
          >
            Login
          </Button>)}
   
    </div>

    </div>
    
        
</div></>
  );
};

export default Navbar;
