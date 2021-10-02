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
  const [geocodingOption,setGeocodingOption] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setGeocodingOption(event.target.value);
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
    fetch(method,{
      method: 'POST',
      body: details,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
        setCircularProgress("static");
        history.push('/results',{ details: data,method:"Geocoding"});
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
    if(geocodingOption === "Coordinates by location name"){
      details = ['q','limit'];
      values = [event.target.q.value,event.target.limit.value];
    }
    if(geocodingOption === "Coordinates by zip/post code"){
      API = 'ZipCode';
      details = ['zip'];
      values = [event.target.zip.value];
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
          <InputLabel id="demo-controlled-open-select-label" style = {{fontSize:"1.1rem",color:"#6a197d",zIndex:"-1"}}>Geocoding Options</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={'Coordinates by location name'}>Coordinates by location name</MenuItem>
            <MenuItem value={'Coordinates by zip/post code'}>Coordinates by zip/post code</MenuItem>
          </Select>
        </FormControl>
        {geocodingOption === "" && <div class="container"><SelectOption /></div>}
        {geocodingOption != "" &&
          <div class="wrapper" style={{textAlign:'left'}}>
        			<div class="inner">
                  {geocodingOption === "Coordinates by location name" &&
            				<form onSubmit={clickHandler}>
            					<h3 class="heading">{geocodingOption}</h3>
            					<p>Search for locations while working with geographic names and coordinates</p>
                      {props.details[0].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
                      {circularProgress==="indeterminate"? <CircularProgress class="loader" color="default" variant={circularProgress}/>:
                      <button class="form-button" type="submit" value = "submit">Submit
            						<i class="zmdi zmdi-arrow-right"></i>
            					</button>}
                    </form>
                  }
                  {geocodingOption === "Coordinates by zip/post code" &&
                    <form onSubmit={clickHandler}>
                      <h3 class="heading">{geocodingOption}</h3>
                      <p>Search for locations while working with geographic names and coordinates</p>
                      {props.details[1].map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required}/>:<Dropdown name={info.name} description={info.description} content={info.content}/>))}
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
