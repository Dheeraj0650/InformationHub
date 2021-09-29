import React, {useState, useEffect} from "react";
import ResultsCard from '../weather/ResultsCard';
import '../weather/Results.css';

export default function(props){
  let minuteKeys = Object.keys(props.details);
  const movieInfo = {
    name:"Name of the Movie/TV series",
    original_name:"Original name of the Movie/TV series",
    vote_count:"Total number of votes, users can cast a vote (from 1 to 10) on every released title",
    vote_average:"Average of all votes casted(from 1 to 10) i.e (sum of all votes value)/vote_count ",
    first_air_date:"First episode release date",
    overview:"brief summary of a completed screenplay's core concept, major plot points, and main character arcs"
  }
  return (
       <div class="container results" >
          <div class="wrapper results-card">
              <div class="inner" style={{width:"70rem",paddingLeft:"0px",paddingRight:"0px"}}>
                  <h3 class="heading">{props.details.name?props.details.name:props.details.title}</h3>
                  <p></p>
                  <div class="container" >
                      {minuteKeys.map((key,index) => {
                        if(typeof props.details[key] === "number" || typeof props.details[key] === "string"){
                          let value = props.details[key];
                          return <ResultsCard class = "card l-bg-green-dark" heading = {key} value = {value} headingInfo = {movieInfo[key]}/>
                        }
                      })}
                  </div>
              </div>
          </div>
       </div>
  )
}
