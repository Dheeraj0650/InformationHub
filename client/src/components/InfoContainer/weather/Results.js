import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import './Results.css';
import ResultsCard from './ResultsCard';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import weatherInfo from './weatherInfo';
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

export default function(){
  const classes = useStyles();
  const [timeOption,setTimeOption] = useState('');
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  var details = history.location.state.details;
  var method = history.location.state.method;
  var detailsArray = {
    current:false,
    hourly:false,
    minutely:false,
    daily:false,
    alerts:false
  };

  var currentTime = undefined;
  var hourTime = undefined;
  var minuteTime = undefined;
  var dailyTime = undefined;
  var alertsTime = undefined;
  var timeKeys = undefined;
  if(method === "Weather"){
    for(var time in details){
      if(time in detailsArray){
        detailsArray[time] = details[time];
      }
    }
    currentTime = detailsArray.current;
    hourTime = detailsArray.hourly;
    minuteTime = detailsArray.minutely;
    dailyTime = detailsArray.daily;
    alertsTime = detailsArray.alerts;
    timeKeys = Object.keys(currentTime);
  }

  if(method === "WeatherByCityName" || method === "WeatherByCityNameList" || method === "AirPollution"){
    currentTime = details;
    timeKeys = Object.keys(currentTime);
  }

  if(method === "Geocoding"){
    if(Array.isArray(details)){
      currentTime = details;
    }
    else{
      currentTime = [details];
    }
  }

  const handleChange = (event) => {
    setTimeOption(event.target.value);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const date = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString("en-US", {timeZoneName: "short"});
    return humanDateFormat;
  }

  return (
      <React.Fragment>
          {method === "Weather" &&
              <div class = "container results-container" style={{textAlign:'center'}}>
                    <FormControl variant="filled" className={classes.formControl} style={{minWidth: 250,marginBottom:"2rem"}} >
                      <InputLabel id="demo-controlled-open-select-label" style = {{fontSize:"1.1rem",color:"#6a197d",zIndex:"-1"}}>Time Options</InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleChange}
                      >
                        <MenuItem value={''}>None</MenuItem>
                        {detailsArray.current && <MenuItem value={'current'}>current</MenuItem>}
                        {detailsArray.daily && <MenuItem value={'daily'}>daily</MenuItem>}
                        {detailsArray.minutely && <MenuItem value={'minutely'}>minutely</MenuItem>}
                        {detailsArray.hourly && <MenuItem value={'hourly'}>hourly</MenuItem>}
                        {detailsArray.alerts && <MenuItem value={'alerts'}>alerts</MenuItem>}
                      </Select>
                    </FormControl>
                    {timeOption === "" && <div class="container"><SelectOption /></div>}
                    {timeOption === "current" &&
                        <div class="wrapper results-card" style={{marginLeft:'0px',marginRight:'0px'}}>
                            <div class="inner" style={{width:"70rem",paddingLeft:"0px",paddingRight:"0px"}}>
                                <h3 class="heading">Current Time</h3>
                                <p>{date(currentTime.dt)}</p>
                                <div class="container" >
                                  {timeKeys.map((key,index) => {
                                    var weatherIcon = `http://openweathermap.org/img/wn/${currentTime.weather[0].icon}@2x.png`;
                                    var weather = currentTime.weather[0].description;
                                      if(typeof currentTime[key] === "number"){
                                        let value = currentTime[key];
                                        let headingInfo = undefined;
                                        if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                            value = date(value);
                                        }
                                        if(key in weatherInfo){
                                          headingInfo = weatherInfo[key];
                                        }
                                        return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                      }
                                  })}
                                </div>
                           </div>
                        </div>
                      }
                      {timeOption === "daily" &&
                          <AwesomeSlider bullets = {true} organicArrows = {dailyTime.length > 1?true:false} style={{zIndex:"0"}}>
                                  {dailyTime.map((info) => {
                                      var dailyKeys = Object.keys(info);
                                      var weatherIcon = info.weather?`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`:'';
                                      var weather = info.weather?info.weather[0].description:'';
                                      return (
                                              <div class="container results">
                                                  <div class="wrapper results-card">
                                                        <div class="inner" style={{width:"70rem",height:"100rem",paddingLeft:"0px",paddingRight:"0px"}}>
                                                            <h3 class="heading">Daily Time</h3>
                                                            <p>{date(info.dt)}</p>
                                                            <div class="container" >
                                                                {dailyKeys.map((key,index) => {
                                                                  if(typeof info[key] === "number"){
                                                                    let value = info[key];
                                                                    let headingInfo = undefined;
                                                                    if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                                                        value = date(value);
                                                                    }
                                                                    if(key in weatherInfo){
                                                                      headingInfo = weatherInfo[key];
                                                                    }
                                                                    return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                                  }
                                                                })}
                                                            </div>
                                                       </div>
                                                    </div>
                                              </div>
                                             )
                                  })}
                          </AwesomeSlider>
                      }
                      {timeOption === "minutely" &&
                      <AwesomeSlider bullets = {true} organicArrows = {minuteTime.length > 1?true:false} style={{zIndex:"0"}}>
                              {minuteTime.map((info) => {
                                  var minuteKeys = Object.keys(info);
                                  var weatherIcon = info.weather?`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`:'';
                                  var weather = info.weather?info.weather[0].description:'';
                                  return (
                                          <div class="container results">
                                              <div class="wrapper results-card">
                                                    <div class="inner" style={{width:"70rem",height:"100rem",paddingLeft:"0px",paddingRight:"0px"}}>
                                                        <h3 class="heading">Minutely Time</h3>
                                                        <p>{date(info.dt)}</p>
                                                        <div class="container" >
                                                            {minuteKeys.map((key,index) => {
                                                              if(typeof info[key] === "number"){
                                                                let value = info[key];
                                                                let headingInfo = undefined;
                                                                if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                                                    value = date(value);
                                                                }
                                                                if(key in weatherInfo){
                                                                  headingInfo = weatherInfo[key];
                                                                }
                                                                return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                              }
                                                            })}
                                                        </div>
                                                   </div>
                                                </div>
                                          </div>
                                         )
                              })}
                      </AwesomeSlider>
                      }
                      {timeOption === "hourly" &&
                          <AwesomeSlider bullets = {true} organicArrows = {hourTime.length > 1?true:false} style={{zIndex:"0"}}>
                                  {hourTime.map((info) => {
                                      var hourKeys = Object.keys(info);
                                      var weatherIcon = info.weather?`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`:'';
                                      var weather = info.weather?info.weather[0].description:'';
                                      return (
                                              <div class="container results">
                                                  <div class="wrapper results-card" >
                                                        <div class="inner" style={{width:"70rem",height:"100rem",paddingLeft:"0px",paddingRight:"0px"}}>
                                                            <h3 class="heading">Hourly Time</h3>
                                                            <p>{date(info.dt)}</p>
                                                            <div class="container">
                                                                {hourKeys.map((key,index) => {
                                                                  if(typeof info[key] === "number"){
                                                                    let value = info[key];
                                                                    let headingInfo = undefined;
                                                                    if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                                                        value = date(value);
                                                                    }
                                                                    if(key in weatherInfo){
                                                                      headingInfo = weatherInfo[key];
                                                                    }
                                                                    return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                                  }
                                                                })}
                                                            </div>
                                                       </div>
                                                    </div>
                                              </div>
                                             )
                                  })}
                          </AwesomeSlider>
                      }
                      {timeOption === "alerts" && alertsTime.map((key,index) => {
                        if(typeof alertsTime[key] === "number"){
                          let value = alertsTime[key];
                          if(['dt','sunrise','sunset','start','end'].includes(key)){
                              value = date(value);
                          }
                          return <ResultsCard class = "card l-bg-orange-dark" heading = {key} value = {value} />
                        }
                      })}
                </div>
          }
              {method === "WeatherByCityName" &&
                  <div class="wrapper results-card" style={{marginLeft:'0px',marginRight:'0px'}}>
                      <div class="inner" style={{width:"70rem",paddingLeft:"0px",paddingRight:"0px"}}>
                          <h3 class="heading">Current Time</h3>
                          <p>{date(currentTime.dt)}</p>
                          <div class="container" >
                            {timeKeys.map((key,index) => {
                                if(typeof currentTime[key] === "number" || typeof currentTime[key] === "string"){
                                  var weatherIcon = currentTime.weather?`http://openweathermap.org/img/wn/${currentTime.weather[0].icon}@2x.png`:'';
                                  var weather = currentTime.weather?currentTime.weather[0].description:'';
                                  let value = currentTime[key];
                                  let headingInfo = undefined;
                                  if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                      value = date(value);
                                  }
                                  if(key in weatherInfo){
                                    headingInfo = weatherInfo[key];
                                  }
                                  if(!(['type','cod','id'].includes(key))){
                                    return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                  }
                                }
                                else if(typeof currentTime[key] === "object" && key != "weather" ){
                                  var weatherIcon = currentTime.weather?`http://openweathermap.org/img/wn/${currentTime.weather[0].icon}@2x.png`:'';
                                  var weather = currentTime.weather?currentTime.weather[0].description:'';
                                  let currentTimeKeys = Object.keys(currentTime[key]);
                                  return (
                                    <React.Fragment>
                                      {currentTimeKeys.map((key_1,index_1) => {
                                        let value = currentTime[key][key_1];
                                        let headingInfo = undefined;
                                        if(['dt','sunrise','sunset','moonrise','moonset'].includes(key_1)){
                                            value = date(value);
                                        }
                                        if(key_1 in weatherInfo){
                                          headingInfo = weatherInfo[key_1];
                                        }
                                        if(!(['type','cod','id'].includes(key_1))){
                                          return <ResultsCard class = "card l-bg-green-dark" heading = {key_1} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                        }
                                      })}
                                    </React.Fragment>
                                  )
                                }



                            })}
                          </div>
                     </div>
                  </div>
              }
              {method === "WeatherByCityNameList" &&
              <AwesomeSlider bullets = {true} organicArrows = {currentTime.length > 1?true:false} style={{zIndex:"0"}}>
                          {currentTime.list.map((timeKeys_1) => {
                                let timeKeys = Object.keys(timeKeys_1);
                                var weatherIcon = timeKeys_1.weather?`http://openweathermap.org/img/wn/${timeKeys_1.weather[0].icon}@2x.png`:'';
                                var weather = timeKeys_1.weather?timeKeys_1.weather[0].description:'';
                                return (
                                  <div class="container results-container">
                                      <div class="wrapper results-card" style={{marginLeft:'0px',marginRight:'0px'}}>
                                              <div class="inner" style={{width:"70rem",paddingLeft:"0px",paddingRight:"0px"}}>
                                                  <h3 class="heading">Current Time</h3>
                                                  <p>{date(timeKeys_1.dt)}</p>
                                                  <div class="container" >
                                                    {timeKeys.map((key,index) => {
                                                        if(typeof timeKeys_1[key] === "number" || typeof timeKeys_1[key] === "string"){
                                                          let value = timeKeys_1[key];
                                                          let headingInfo = undefined;
                                                          if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                                              value = date(value);
                                                          }
                                                          if(key in weatherInfo){
                                                            headingInfo = weatherInfo[key];
                                                          }
                                                          if(!(['type','cod','id'].includes(key))){
                                                            return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                          }
                                                        }
                                                        else if(typeof timeKeys_1[key] === "object" && key != "weather" && timeKeys_1[key] != null){
                                                          let currentTimeKeys = Object.keys(timeKeys_1[key]);
                                                          return (
                                                            <React.Fragment>
                                                              {currentTimeKeys.map((key_1,index_1) => {
                                                                let value = timeKeys_1[key][key_1];
                                                                let headingInfo = undefined;
                                                                if(['dt','sunrise','sunset','moonrise','moonset'].includes(key_1)){
                                                                    value = date(value);
                                                                }
                                                                if(key_1 in weatherInfo){
                                                                  headingInfo = weatherInfo[key_1];
                                                                }
                                                                if(!(['type','cod','id'].includes(key_1))){
                                                                  return <ResultsCard class = "card l-bg-green-dark" heading = {key_1} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                                }
                                                              })}
                                                            </React.Fragment>
                                                          )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  )
                              }
                            )}
                </AwesomeSlider>
              }
              {method === "AirPollution" &&
              <AwesomeSlider bullets = {true} organicArrows = {currentTime.length > 1?true:false} style={{zIndex:"0",height:"70rem"}}>
                          {currentTime.list.map((timeKeys_1) => {
                                let timeKeys = Object.keys(timeKeys_1);
                                var weatherIcon = timeKeys_1.weather?`http://openweathermap.org/img/wn/${timeKeys_1.weather[0].icon}@2x.png`:'';
                                var weather = timeKeys_1.weather?timeKeys_1.weather[0].description:'';
                                return (
                                  <div class="container results-container">
                                      <div class="wrapper results-card" style={{marginLeft:'0px',marginRight:'0px'}}>
                                              <div class="inner" style={{width:"70rem",paddingLeft:"0px",paddingRight:"0px"}}>
                                                  <h3 class="heading">Air Pollution</h3>
                                                  <p>{date(timeKeys_1.dt)}</p>
                                                  <div class="container" >
                                                    {timeKeys.map((key,index) => {
                                                        if(typeof timeKeys_1[key] === "number" || typeof timeKeys_1[key] === "string"){
                                                          let value = timeKeys_1[key];
                                                          let headingInfo = undefined;
                                                          if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                                              value = date(value);
                                                          }
                                                          if(key in weatherInfo){
                                                            headingInfo = weatherInfo[key];
                                                          }
                                                          if(!(['type','cod','id'].includes(key))){
                                                            return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                          }
                                                        }
                                                        else if(typeof timeKeys_1[key] === "object" && key != "weather" && timeKeys_1[key] != null){
                                                          let currentTimeKeys = Object.keys(timeKeys_1[key]);
                                                          return (
                                                            <React.Fragment>
                                                              {currentTimeKeys.map((key_1,index_1) => {
                                                                let value = timeKeys_1[key][key_1];
                                                                let headingInfo = undefined;
                                                                if(['dt','sunrise','sunset','moonrise','moonset'].includes(key_1)){
                                                                    value = date(value);
                                                                }
                                                                if(key_1 in weatherInfo){
                                                                  headingInfo = weatherInfo[key_1];
                                                                }
                                                                if(!(['type','cod','id'].includes(key_1))){
                                                                  return <ResultsCard class = "card l-bg-green-dark" heading = {key_1} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                                }
                                                              })}
                                                            </React.Fragment>
                                                          )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                  )
                              }
                            )}
                </AwesomeSlider>
              }
              {method === "Geocoding" &&
                <AwesomeSlider bullets = {true} organicArrows = {currentTime.length > 1?true:false} style={{zIndex:"0",height:"80rem"}}>
                        {currentTime.map((timeKeys_1) => {
                              let timeKeys = Object.keys(timeKeys_1);
                              var weatherIcon = timeKeys_1.weather?`http://openweathermap.org/img/wn/${timeKeys_1.weather[0].icon}@2x.png`:'';
                              var weather = timeKeys_1.weather?timeKeys_1.weather[0].description:'';
                              return (
                                <div class="container results-container">
                                    <div class="wrapper results-card" style={{marginLeft:'0px',marginRight:'0px'}}>
                                            <div class="inner" style={{width:"70rem",paddingLeft:"0px",paddingRight:"0px"}}>
                                                <h3 class="heading">Geocoding</h3>
                                                <p>{timeKeys_1.name}</p>
                                                <div class="container" >
                                                  {timeKeys.map((key,index) => {
                                                      if(typeof timeKeys_1[key] === "number" || typeof timeKeys_1[key] === "string"){
                                                        let value = timeKeys_1[key];
                                                        let headingInfo = undefined;
                                                        if(['dt','sunrise','sunset','moonrise','moonset'].includes(key)){
                                                            value = date(value);
                                                        }
                                                        if(key in weatherInfo){
                                                          headingInfo = weatherInfo[key];
                                                        }
                                                        if(!(['type','cod','id'].includes(key))){
                                                          return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                        }
                                                      }
                                                      else if(typeof timeKeys_1[key] === "object" && key != "weather" && timeKeys_1[key] != null){
                                                        let currentTimeKeys = Object.keys(timeKeys_1[key]);
                                                        return (
                                                          <React.Fragment>
                                                            {currentTimeKeys.map((key_1,index_1) => {
                                                              let value = timeKeys_1[key][key_1];
                                                              let headingInfo = undefined;
                                                              if(['dt','sunrise','sunset','moonrise','moonset'].includes(key_1)){
                                                                  value = date(value);
                                                              }
                                                              if(key_1 in weatherInfo){
                                                                headingInfo = weatherInfo[key_1];
                                                              }
                                                              if(!(['type','cod','id'].includes(key_1))){
                                                                return <ResultsCard class = "card l-bg-green-dark" heading = {key_1} value = {value} weatherIcon = {weatherIcon} headingInfo = {headingInfo} weather={weather}/>
                                                              }
                                                            })}
                                                          </React.Fragment>
                                                        )
                                                      }
                                                  })}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                )
                            }
                          )}
                  </AwesomeSlider>
              }
      </React.Fragment>
  );
}
