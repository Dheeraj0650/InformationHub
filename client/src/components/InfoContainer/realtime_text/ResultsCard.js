import React, {useState, useEffect} from "react";
import ResultsCard from '../weather/ResultsCard';
import '../weather/Results.css';

export default function(props){
  let minuteKeys = Object.keys(props.details);
  return (
       <div class="container results" >
          <div class="wrapper results-card">
              <div class="inner" style={{width:"70rem",paddingLeft:"0px",paddingRight:"0px"}}>
                  <h3 class="heading">{props.details.title}</h3>
                  <p></p>
                  <div class="container" >
                      {minuteKeys.map((key,index) => {
                        if((typeof props.details[key] === "number" || typeof props.details[key] === "string") && (props.details[key] != "" && key != "_id" && key != "__v")){
                          let value = props.details[key];
                          return (key === 'comment')?<React.Fragment><div class="container"><span style={{fontSize:"1.2rem",textAlign:"justify"}}>{value}</span></div><hr style={{backgroundColor:"white"}}/></React.Fragment>:<ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value}/>
                        }
                      })}
                  </div>
              </div>
          </div>
       </div>
  )
}
