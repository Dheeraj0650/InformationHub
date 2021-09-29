import React from "react";

export default function(props){
  return (
    <div class="container">
      <label class="form-group">
        <input name = {props.name} type="text" class="form-control" required={props.required}/>
        <span>{props.name}</span>
        <span class="border"></span>
        <span style={{marginTop:"2.3rem",fontSize:"0.8rem",color:"white"}}>{props.description}</span>
      </label>
    </div>
  );
}
