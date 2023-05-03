import React, { useState } from "react"
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
// import Icon from "./icon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


export default function Auth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const switchMode = () => {
    setIsSignup(!isSignup)
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwt_decode(token);

    try {
      dispatch({ type: 'AUTH', data: { result }})
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
    console.log(error)
    console.log("Google Log In was unsuccessful. Try Again Later");
  }
  return (
  <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5"> {isSignup ? 'Sign Up' : 'Log In'}</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {
            isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
              </>
            )
          }
          <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
          { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          {isSignup ? 'Sign Up' : 'Log In'}
        </Button>
        <GoogleLogin 
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          fullWidth
        />
        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  )
}