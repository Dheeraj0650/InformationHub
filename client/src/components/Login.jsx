import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useDispatch} from 'react-redux';
import Cookies from 'js-cookie';
import socialMediaAuth from '../config/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import {googleProvider,githubProvider,microsoftProvider} from '../config/authMethods';
import { authActions } from '../store/index';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}

    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1000,
    outline:null
  },
}));

export default function FullWidthTabs(props) {
  const dispatch = useDispatch();
  const [alert_1,changeAlert_1] = useState([false,'']);
  const [alert_2,changeAlert_2] = useState([false,'']);
  const [alert_3,changeAlert_3] = useState([false,'']);
  const [alert_4,changeAlert_4] = useState([false,'']);
  const [alert_5,changeAlert_5] = useState([false,'']);
  const [circularProgress,setCircularProgress] = useState("static");

  let verify = false;

  function validateUsername(event){
  	  var username=event.target.value;
  	  var usernamepattern=/^[A-Za-z .]{3,15}$/;
    	if(usernamepattern.test(username))
    	{
        if((event.target.name.charAt(event.target.name.length-1))==='3')
        {
          changeAlert_5([true,""])
        }
        else{
          changeAlert_3([true,""])
        }
      }
      else
      {
        if((event.target.name.charAt(event.target.name.length-1))==='3')
        {
          changeAlert_5([false,"* invalid username, username should contain only characters [A-Z][a-z] and length should be in between 3 and 15"])
        }
        else{
          changeAlert_3([false,"* invalid username, username should contain only characters [A-Z][a-z] and length should be in between 3 and 15"])
        }
      }
	 }

  function validatePassword(event) {
     var str = event.target.value;
     var res;
     if (str.match(/[a-z]/g) && str.match(/[A-Z]/g) && str.match(/[0-9]/g) && str.match(/[^a-zA-Z\d]/g) && str.length >= 8)
         res = 1;
     else
         res = 0;

    if((event.target.name.charAt(event.target.name.length-1))==='1')
    {   if(res === 1){
          changeAlert_2([true,""]);
        }
        else{
          changeAlert_2([false,"* weak password A password is correct if it contains: 1) At least 1 uppercase character.2) At least 1 lowercase character.3) At least 1 digit.4) At least 1 special character.5) Minimum 8 characters."]);
          if(str===""){
             changeAlert_2([true,""]);
          }
        }
    }
    else{
        if(res === 1){
            changeAlert_4([true,""]);
        }
        else{
          changeAlert_4([false,"* invalid password "]);
          if(str===""){
             changeAlert_4([true,""]);
          }
        }
    }


  }


  function validateEmail(event)
  {
    var str = event.target.value;
    var res;
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str))
    {
      res = 1;
    }
    else{
      res = 0;
    }

    if((event.target.name.charAt(event.target.name.length-1))==='1')
    {
      if(res === 1){
           changeAlert_1([true,""]);
         }
         else{
           changeAlert_1([false,"* invalid email "]);
           if(str===""){
              changeAlert_1([true,""]);
           }
         }
    }
    else{
      if(res === 1){
         changeAlert_3([true,""]);
      }
      else{
         changeAlert_3([false,"* invalid email "]);
         if(str===""){
            changeAlert_3([true,""]);
         }
       }
    }


  }


  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function Users(details,method){
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(method,{
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then((response) => {
        var data = response.text();
        var p = Promise.resolve(data);
        p.then(function(value) {
             setCircularProgress("static");
             if(value === "Successful"){
                 if(details.username){
                   dispatch(authActions.login(details.username));
                 }
                 else{
                   dispatch(authActions.login(details.email));
                 }
             }
             else{
                 if(method === 'login'){
                   changeAlert_4([true,value]);
                 }
                 else{
                   changeAlert_2([true,value]);
                 }
                 dispatch(authActions.logout());
             }
         });
    })
  }

  const clickHandler = (event) => {
      event.preventDefault();
      if(event.target.username_1){
        if(alert_1[0] && alert_2[0] && alert_5[0]){
          setCircularProgress("indeterminate");
          const username = event.target.username_3.value;
          const email = event.target.username_1.value;
          const password = event.target.password_1.value;
          let details = {
            'email':email,
            'username':username,
            'password':password
          };
          Users(details,'register');
        }
      }
      else{
        if(alert_3[0] && alert_4[0]){
          setCircularProgress("indeterminate");
          const username = event.target.username_2.value;
          const password = event.target.password_2.value;
          let details = {
            'username':username,
            'password':password
          };
          Users(details,'login');
        }
      }
  }

  const clickHandlerOAuth = async (method) => {
    setCircularProgress("indeterminate");
    const res = await socialMediaAuth(method);
    const username = res.displayName;
    const email = res.email;
    const googleId = res.uid;
    let details = {
      'email':email,
      'username':username,
      'googleId':googleId
    };
    if(res.email){
      if(method === googleProvider){
        Users(details,'auth/google');
      }
      else if(method === githubProvider){
        Users(details,'auth/github');
      }
      else if(method === microsoftProvider){
        Users(details,'auth/microsoft');
      }
    }
    else{
      setCircularProgress("static");
    }

  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Signup" {...a11yProps(0)} />
          <Tab label="Login" {...a11yProps(1)} />
          <Tab label="OAuth" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <div class="container-fluid">
        <div class="signup">
            <form onSubmit = {clickHandler}>
              <label for="chk" aria-hidden="true" class="login-label">Sign up</label>
              <input onChange = {validateUsername} type="name" name="username_3" placeholder="Username" required="" class="login-input username-2" />
              <p className = "alert">{alert_5[1]}</p>
              <input onChange={validateEmail}  type="email" name="username_1" placeholder="Email" required="" class="login-input username-1" />
              <p className = "alert">{alert_1[1]}</p>
              <input onChange={validatePassword}  type="password" name="password_1" placeholder="Password" required="" class="login-input password-1" />
              <p className = "alert">{alert_2[1]}</p>
              {circularProgress==="indeterminate" && <CircularProgress color="primary" variant={circularProgress}/>}
              <button type="submit" class="hover-button">Sign up</button>
            </form>
        </div>
        </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <div class="login">
            <form onSubmit = {clickHandler}>
              <label for="chk" aria-hidden="true" class="login-label">Login</label>
              <input onChange = {validateUsername} type="name" name="username_2" placeholder="Username" required="" class="login-input username-2" />
              <p className = "alert">{alert_3[1]}</p>
              <input onChange={validatePassword} type="password" name="password_2" placeholder="Password" required="" class="login-input password-2" />
              <p className = "alert">{alert_4[1]}</p>
              {circularProgress==="indeterminate" && <CircularProgress color="primary" variant={circularProgress}/>}
              <button type="submit" class="hover-button">Login</button>
            </form>
       </div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
            <div class="container-fluid" style={{lineHeight:"5",display:"grid",justifyContent:"center",alignItems:"center"}}>
            <a onClick = {() => clickHandlerOAuth(googleProvider)} class="btn btn-outline-danger btn-block btn-6" style={{fontSize:"1.15rem"}}><i class="fab fa-google" style={{paddingRight:"1rem",fontSize:"1.4rem"}}></i> Sign in with <b>Google</b></a>
            <a onClick = {() => clickHandlerOAuth(microsoftProvider)} class="btn btn-outline-success btn-block btn-4" style={{fontSize:"1.15rem"}}><i class="fab fa-microsoft" style={{paddingRight:"1rem",fontSize:"1.4rem"}}></i> Sign in with <b>Microsoft</b></a>
            <a onClick = {() => clickHandlerOAuth(githubProvider)} class="btn btn-outline-dark btn-block btn-5" style={{fontSize:"1.15rem"}}><i class="fab fa-github " style={{paddingRight:"1rem",fontSize:"1.4rem"}}></i>Sign in with <b>Github</b></a>
            </div>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
