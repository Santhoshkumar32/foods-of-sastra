import React,{useState,useEffect} from 'react'
import { AppBar,Button,Typography,Toolbar} from '@material-ui/core'
import makeStyles from './styles'
import food from '../../images/fos2.png';
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes=makeStyles();
    const dispatch=useDispatch();
    const navigateTO=useNavigate();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const location=useLocation();
    console.log("userah",user);

    useEffect(()=>{
      const token= user?.token;
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);

    const handleLogout=()=>{
      dispatch({type:'LOGOUT'});
      navigateTO('/');
      setUser(null);
    }

  return (
    <AppBar className={classes.appBar} position="static"  style={{ backgroundColor:'#ffffff', boxShadow: 'none'}}>
        <div className={classes.brandContainer} >
           <Typography  component={Link} to="/" className={classes.heading} variant="h2" align="center" >
              Foods Of SASTRA :)
            </Typography>
        </div>   
        <Toolbar className={classes.toolbar}>
            {user?.result ? ( 
                <div className={classes.profile}>
                     <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>
                       Logout
                     </Button>
                </div>
            ) : ( 
                <Button component={Link} to='auth' variant='contained' color="primary" className={classes.authButton}>Sign In</Button>
            ) }
        </Toolbar>     
    </AppBar>
  )
}

export default Navbar;
