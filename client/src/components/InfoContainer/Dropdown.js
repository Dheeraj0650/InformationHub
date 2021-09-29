import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function(props){
  let content_arr = [];

  for (const key in props.content){
    content_arr.push([key ,props.content[key]]);
  }

  const [state, setState] = React.useState('');

  const handleChange = (event) => {
    const name = event.target.value;
    setState(name);
  };

  return (
    <div class="container">
      <FormControl variant="filled" >
        <InputLabel htmlFor="filled-age-native-simple" style={{color:"#00ade6"}}>{props.name}</InputLabel>
        <Select
          native
          value={state}
          onChange={handleChange}
          name={props.name}
        >
          <option aria-label="None" value="" />
          {content_arr.map((info) => (<option value={info[0]}>{info[1]}</option>))}
        </Select>
        <span style={{margin:"8px 0 8px 0",fontSize:"0.8rem"}}>{props.description}</span>
      </FormControl>
    </div>
  );
}
