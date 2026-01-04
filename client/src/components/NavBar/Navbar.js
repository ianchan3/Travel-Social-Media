import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import travelText from '../../images/traveltext.avif';
import useStyles from './styles';
import decode from 'jwt-decode';


export default function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  }, [dispatch, navigate]);
  console.log(user)

  const token = user?.token;
  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, token]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/"className={classes.brandContainer}>
        <img src={travelText} alt="icon" height="75px" width="125px"/>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to = "/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}