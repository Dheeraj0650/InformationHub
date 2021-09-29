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

const unixTime = (date) => {
  return new Date(date).getTime() / 1000;
}

export default function Weather(props){
  const classes = useStyles();
  const [airPollutionOption,setAirPollutionOption] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setAirPollutionOption(event.target.value);
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
        history.push('/results',{ details: data,method:"AirPollution"});
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
    if(airPollutionOption === "Current Air Pollution Data"){
      details = ['lat','lon'];
      values = [event.target.latitude.value,event.target.longitude.value];
    }
    if(airPollutionOption === "Forecast Air Pollution Data"){
      API = 'air_pollution/forecast';
      details = ['lat','lon'];
      values = [event.target.latitude.value,event.target.longitude.value];
    }
    if(airPollutionOption === "Historical Air Pollution Data"){
      API = 'air_pollution/history';
      details = ['lat','lon','start','end'];
      values = [event.target.latitude.value,event.target.longitude.value,unixTime(event.target.start.value),unixTime(event.target.end.value)];
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
          <InputLabel id="demo-controlled-open-select-label" style = {{fontSize:"1.1rem",color:"#6a197d",zIndex:"-1"}}>Air Pollution Options</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={'Current Air Pollution Data'}>Current Air Pollution Data</MenuItem>
            <MenuItem value={'Forecast Air Pollution Data'}>Forecast Air Pollution Data</MenuItem>
            <MenuItem value={'Historical Air Pollution Data'}>Historical Air Pollution Data</MenuItem>
          </Select>
        </FormControl>
        {airPollutionOption === "" && <div class="container"><SelectOption /></div>}
        {airPollutionOption != "" &&
          <div class="wrapper" style={{textAlign:'left'}}>
        			<div class="inner">
                  {airPollutionOption === "Current Air Pollution Data" &&
            				<form onSubmit={clickHandler}>
            					<h3 class="heading">{airPollutionOption}</h3>
            					<p>Get air pollution data for any coordinates on the globe</p>
                      {props.details[0].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
            						<i class="zmdi zmdi-arrow-right"></i>
            					</button>}
                    </form>
                  }
                  {airPollutionOption === "Forecast Air Pollution Data" &&
                    <form onSubmit={clickHandler}>
                      <h3 class="heading">{airPollutionOption}</h3>
                      <p>Get air pollution data for any coordinates on the globe</p>
                      {props.details[0].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
                        <i class="zmdi zmdi-arrow-right"></i>
                      </button>}
                    </form>
                  }
                  {airPollutionOption === "Historical Air Pollution Data" &&
            				<form onSubmit={clickHandler}>
            					<h3 class="heading">{airPollutionOption}</h3>
                      <p>Get air pollution data for any coordinates on the globe</p>
                      {props.details[1].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
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
