import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../constants/actionTypes';
import {gapi} from 'gapi-script';
import Input from './Input';
import Icon from './icon';
import {signin,signup} from '../../actions/auth'


const Auth = () => {  
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const dispatch= useDispatch();
  const [formData,setFormData]=useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: ''});
  const navigateTO=useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData,isSignup)
    if(isSignup)
    {
      dispatch(signup(formData,navigateTO))
    }
    else
    {
      console.log("hello")
      dispatch(signin(formData,navigateTO))
    }
    }

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) => {
    
    setFormData({...formData,[e.target.name]:e.target.value})
   
  };

  useEffect(()=>{
    const start=()=>{
      gapi.client.init(
       { clientId:"161193840592-3l5kmns82j66rk9h8t7q0j073avs2gg3.apps.googleusercontent.com" 
      }
      );
    }
    gapi.load('client:auth2',start)
  },[]);
 
  const googleError = (error) => {
    console.log(error)
    alert('Google Sign In was unsuccessful. Try again later');                   
}

  const googleSuccess = async (res) => {
    const result=res?.profileObj;
    const token=res?.tokenId;
    console.log(res);
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigateTO('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="161193840592-3l5kmns82j66rk9h8t7q0j073avs2gg3.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
