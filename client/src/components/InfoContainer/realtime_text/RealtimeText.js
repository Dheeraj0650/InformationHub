import RealtimeTextCard from './RealtimeTextCard';
import React, {useEffect, useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import AddCard from './AddCard';
import {addCard} from '../InfoData';
import io from "socket.io-client";
import { realtimeTextResult } from '../../../store/index';
import { useDispatch, useSelector} from 'react-redux';
import ResultsCard from './ResultsCard';

const socket = io('http://localhost:9000');

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

export default function RealtimeText(){
  const dispatch = useDispatch();
  const team = useSelector(state => state.realtimeTextTeamResult.details);
  const username = useSelector(state => state.auth.username);
  const realtimeTextCard = useSelector(state => state.realtimeTextCardResult.details);
  const realtimeTextResults = useSelector(state => state.realtimeTextResult.details);
  
  useEffect(function(){
    socket.emit("added-new-card",JSON.stringify(realtimeTextCard));
    addNewCardArray([...cardArray, realtimeTextCard])
  },[realtimeTextCard]);

  const [cardArray,addNewCardArray] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [page,setPageToShow] = useState('');
  const classes = useStyles();

  const handleChange = (event) => {
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true);
  };

  const handleAddEvent = () => {
    setPageToShow("AddPage");
  }

  useEffect(function(){
    console.log("hello");
    socket.on(
       "changes-in-card",function(data){
         var details = "username=" + username + "&" + "team=" + team;
         console.log(details)
         fetch('http://localhost:9000/realtimeCards',{
           method:'POST',
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           },
           body:details,
         })
         .then(function(resp) { 
          console.log(resp)
          return resp.json() 
        }) // Convert data to json
         .then(function(data) {
          console.log(data);
           addNewCardArray(data);
         }).catch(function(error){
            console.log(error)
         })
         setPageToShow("HomePage");
       }
     );
  },[]);
  
  const group = {
    minor:'card_3 gr-3',
    major:'card_3 gr-2',
    critical:'card_3 gr-1'
  };

  const groupIcon = {
    minor:'fas fa-running',
    major:'fas fa-stroopwafel',
    critical:'fas fa-skull-crossbones'
  };

  var backButtonHandler = () => {
    dispatch(realtimeTextResult.setRealtimeText(''));
  }

  // <RealtimeTextCard card_group = "card_3 gr-1" status = "fas fa-skull-crossbones"/>
  // <RealtimeTextCard card_group = "card_3 gr-2" status = "fas fa-stroopwafel"/>
  // <RealtimeTextCard card_group = "card_3 gr-3" status = "fas fa-running"/>
  // <RealtimeTextCard card_group = "card_3 gr-1" status = "fas fa-skull-crossbones"/>
  // <RealtimeTextCard card_group = "card_3 gr-2" status = "fas fa-stroopwafel"/>
  // <RealtimeTextCard card_group = "card_3 gr-3" status = "fas fa-running"/>

  return (
    <div class="container-fluid">
    {(realtimeTextResults !== '') && <button type="button" class="btn btn-outline-primary" onClick = {backButtonHandler} style={{position:"absolute",left:"4rem",top:"5.5rem"}}><i class="fas fa-arrow-circle-left" style={{marginRight:"0.4rem",marginTop:"0.2rem",fontSize:"1rem"}}></i><strong style={{fontSize:"1.1rem"}}>Back</strong></button>}
      <div class="container" style={{textAlign:"center"}}>
        <button class="btn btn-outline-primary" style={{marginTop:"1rem",width:"3rem",height:"3rem"}} onClick = {handleAddEvent}>
          <i class="fas fa-plus"></i>
        </button>
        <FormControl variant="filled" className={classes.formControl} style={{minWidth: 250,marginBottom:"2rem"}} >
          <InputLabel id="demo-controlled-open-select-label" style = {{fontSize:"1.1rem",color:"#6a197d",zIndex:"-1"}}>Options</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            <MenuItem value={'trending'}>Realtime Text</MenuItem>
            <MenuItem value={'search'}>Realtime Text Board</MenuItem>
          </Select>
        </FormControl>
        <div class="dropdown show" style={{display:"inline"}}>
          <button class="btn btn-outline-primary" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginTop:"1rem",width:"3rem",height:"3rem"}}>
            <i class="fas fa-filter"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <span class="dropdown-item" >Sort by name</span>
            <span class="dropdown-item" >Sort by year</span>
            <span class="dropdown-item" >Sort by rating</span>
            <div class="dropdown-divider"></div>
            <span class="dropdown-item" >Ascending</span>
            <span class="dropdown-item" >Descending</span>
            <span class="dropdown-item" >Reverse the order</span>
          </div>
        </div>
      </div>
      {page === "AddPage" && <AddCard details={addCard} setPageToShow={setPageToShow}/>}
        {page === "HomePage" && <div class="row align-middle">
          {(page === "HomePage" && realtimeTextResults === '')?cardArray.map((info) => (<RealtimeTextCard card_group = {group[info.priority]} status = {groupIcon[info.priority]} name = {info.name} title = {info.title} details = {info.comment} data = {info}/>)):<ResultsCard details={realtimeTextResults} />}
        </div>}
    </div>
  )
}
