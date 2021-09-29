import RealtimeTextCard from './RealtimeTextCard';
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

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
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
  };
  const handleClose = () => {
      setOpen(false);
  };
  const handleOpen = () => {
      setOpen(true);
  };

  return (
    <div class="container-fluid">
      <div class="container" style={{textAlign:"center"}}>
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
      </div>
      <div class="row align-middle">
        <RealtimeTextCard card_group = "card_3 gr-1" status = "fas fa-skull-crossbones"/>
        <RealtimeTextCard card_group = "card_3 gr-2" status = "fas fa-stroopwafel"/>
        <RealtimeTextCard card_group = "card_3 gr-3" status = "fas fa-running"/>
        <RealtimeTextCard card_group = "card_3 gr-1" status = "fas fa-skull-crossbones"/>
        <RealtimeTextCard card_group = "card_3 gr-2" status = "fas fa-stroopwafel"/>
        <RealtimeTextCard card_group = "card_3 gr-3" status = "fas fa-running"/>
      </div>
    </div>
  )
}
