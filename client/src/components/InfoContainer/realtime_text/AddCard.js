import '../InfoContainer.css';
import InputField from '../InputField';
import Dropdown from '../Dropdown';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { realtimeTextCardResult, realtimeTextTeamResult} from '../../../store/index';
import { useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  resize: {
    height:"20rem",
    fontSize:500
  },
}));

export default function AddCard(props){
  const classes = useStyles();
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();
    var keyArray = ['title','name','priority','comment','team'];
    var valueArray = [];
    if(event.target.title.value){
      valueArray.push(event.target.title.value);
    }
    else{
      valueArray.push('');
    }
    if(event.target.name.value){
      valueArray.push(event.target.name.value);
    }
    else{
      valueArray.push('');
    }
    if(event.target.priority.value){
      valueArray.push(event.target.priority.value);
    }
    else{
      valueArray.push('');
    }
    if(event.target.comment.value){
      valueArray.push(event.target.comment.value);
    }
    else{
      valueArray.push('');
    }
    if(event.target.comment.value){
      valueArray.push(event.target.team.value);
    }
    else{
      valueArray.push('');
    }
    var details = {};
    for(var idx = 0; idx < keyArray.length;idx++){
      details[keyArray[idx]] = valueArray[idx];
    }
    console.log(details);
    // dispatch(realtimeTextTeamResult.setRealtimeTextTeam(event.target.team.value));
    dispatch(realtimeTextCardResult.setRealtimeTextCard(details));
    props.setPageToShow('HomePage');
  }

  return (
      <div class="wrapper">
          <div class="inner" style={{width:"60rem"}}>
            <form onSubmit={clickHandler}>
              <h3 class="heading">Add comment</h3>
              <p></p>
              {props.details.map((info) => (info.type === "InputField"?<InputField name={info.name} description={info.description} required = {info.required} />:<Dropdown name={info.name} description={info.description} content={info.content} required={info.required} width = "20rem"/>))}
              <div class="container">
                <TextField
                  id="filled-multiline-static"
                  label="Enter your comment"
                  multiline
                  rows={10}
                  defaultValue=""
                  variant="filled"
                  fullWidth='true'
                  size="medium"
                  name='comment'
                  inputProps={{style: {fontSize: 25,height:400,paddingTop:20,color:"white",lineHeight:1,textAlign:"justify"}}}
                  required
                />
              </div>
              <button class="form-button" type="submit" value = "submit">Submit
                <i class="zmdi zmdi-arrow-right"></i>
              </button>
            </form>
         </div>
      </div>
  )
}
