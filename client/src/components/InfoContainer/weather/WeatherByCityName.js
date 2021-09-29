import React, {useState} from "react";
import '../InfoContainer.css';
import Dropdown from '../Dropdown';
import InputField from '../InputField';
import {useHistory, NavLink} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import SelectOption from './Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Weather(props){
  const classes = useStyles();
  const [weatherOption,setWeatherOption] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setWeatherOption(event.target.value);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true);
  };
  const history = useHistory();
  const [circularProgress,setCircularProgress] = useState("static");
  const getDetails = (details,method) => {
    setCircularProgress("indeterminate");
    fetch('https://information-hub-backend.herokuapp.com/' + method,{
      method: 'POST',
      body: details,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        setCircularProgress("static");
        if(method === "box/city" || method === "find"){
          history.push('/results',{ details: data,method:"WeatherByCityNameList"});
        }
        else{
          history.push('/results',{ details: data,method:"WeatherByCityName"});
        }
    })
    .catch(err => {
        setCircularProgress("static");
    });
  }
  let clickHandler = (event) => {
    event.preventDefault();
    var API = undefined;
    var details = undefined;
    var values = undefined;
    if(weatherOption === "By City Name"){
      details = ['q','units','lang'];
      values = [event.target.city.value,event.target.units.value,event.target.language.value];
    }
    if(weatherOption === "By Location Coordinates"){
      details = ['lat','lon','units','lang'];
      values = [event.target.latitude.value,event.target.longitude.value,event.target.units.value,event.target.language.value];
    }
    if(weatherOption === "By City ID"){
      details = ['id','units','lang'];
      values = [event.target.id.value,event.target.units.value,event.target.language.value];
    }
    if(weatherOption === "By ZIP code"){
      details = ['zip','units','lang'];
      values = [event.target.zip.value,event.target.units.value,event.target.language.value];
    }
    if(weatherOption === "Cities within a rectangle zone"){
      API = "box/city";
      details = ['bbox','units','lang'];
      values = [event.target.bbox.value,event.target.units.value,event.target.language.value];
    }
    if(weatherOption === "Cities in circle"){
      API = "find";
      details = ['lat','lon','cnt','units','lang'];
      values = [event.target.latitude.value,event.target.longitude.value,event.target.count.value,event.target.units.value,event.target.language.value];
    }
    var formBody = [];
    var idx = 0;
    for (var property in details) {
      var encodedKey = encodeURIComponent(details[property]);
      var encodedValue = encodeURIComponent(values[idx]);
      formBody.push(encodedKey + "=" + encodedValue);
      idx++;
    }
    formBody = formBody.join("&");
    if(API){
      getDetails(formBody,API);
    }
    else{
      getDetails(formBody,props.api);
    }
  }
  return (
    <div class="container results-card" style={{textAlign:'center'}}>
        <FormControl variant="filled" className={classes.formControl} style={{minWidth: 250,marginBottom:"2rem"}} >
          <InputLabel id="demo-controlled-open-select-label" style = {{fontSize:"1.1rem",color:"#6a197d",zIndex:"-1"}}>Weather Options</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={'By City Name'}>By City Name</MenuItem>
            <MenuItem value={'By Location Coordinates'}>By Location Coordinates</MenuItem>
            <MenuItem value={'By City ID'}>By City ID</MenuItem>
            <MenuItem value={'By ZIP code'}>By ZIP code</MenuItem>
            <MenuItem value={'Cities within a rectangle zone'}>Cities within a rectangle zone</MenuItem>
            <MenuItem value={'Cities in circle'}>Cities in circle</MenuItem>
          </Select>
        </FormControl>
        {weatherOption === "" && <div class="container"><SelectOption /></div>}
        {weatherOption != "" &&
          <div class="wrapper" style={{textAlign:'left'}}>
        			<div class="inner">
                  {weatherOption === "By City Name" &&
            				<form onSubmit={clickHandler}>
            					<h3 class="heading">{weatherOption}</h3>
            					<p>Get complete weather data at particular location using City Name</p>
                      {props.details[0].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
            						<i class="zmdi zmdi-arrow-right"></i>
            					</button>}
                    </form>
                  }
                  {weatherOption === "By Location Coordinates" &&
                    <form onSubmit={clickHandler}>
                      <h3 class="heading">{weatherOption}</h3>
                      <p>Get complete weather data at particular location using Location Coordinates</p>
                      {props.details[2].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
                        <i class="zmdi zmdi-arrow-right"></i>
                      </button>}
                    </form>
                  }
                  {weatherOption === "By City ID" &&
            				<form onSubmit={clickHandler}>
            					<h3 class="heading">{weatherOption}</h3>
                      <p>Get complete weather data at particular location using City ID</p>
                      {props.details[1].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
            						<i class="zmdi zmdi-arrow-right"></i>
            					</button>}
                    </form>
                  }
                  {weatherOption === "Cities within a rectangle zone" &&
            				<form onSubmit={clickHandler}>
            					<h3 class="heading">{weatherOption}</h3>
                      <p>Get complete weather data of cities within a rectangle zone</p>
                      {props.details[4].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
            						<i class="zmdi zmdi-arrow-right"></i>
            					</button>}
                    </form>
                  }
                  {weatherOption === "Cities in circle" &&
            				<form onSubmit={clickHandler}>
            					<h3 class="heading">{weatherOption}</h3>
                      <p>Get complete weather data of cities in circle</p>
                      {props.details[5].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
            						<i class="zmdi zmdi-arrow-right"></i>
            					</button>}
                    </form>
                  }
                  {weatherOption === "By ZIP code" &&
                    <form onSubmit={clickHandler}>
                      <h3 class="heading">{weatherOption}</h3>
                      <p>Get complete weather data at particular location using ZIP code</p>
                      {props.details[3].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
                        <i class="zmdi zmdi-arrow-right"></i>
                      </button>}
                    </form>
                  }
              </div>
        </div>
      }
    </div>
  );
}
