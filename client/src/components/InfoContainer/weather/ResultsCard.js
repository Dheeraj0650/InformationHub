import React from 'react';
import './Results.css';
import {getLanguageName} from '../movies/language';

export default function(props){
  let imagePath = `https://image.tmdb.org/t/p/original${props.value}`;
  return (
    <React.Fragment>
      <div class="row">
        <div class="col-6" style={{fontFamily: "'Lato', sans-serif",fontSize:"22px",textAlign: "left"}}>
          {props.heading}
          <div style={{fontFamily: "'Raleway', sans-serif",fontSize:"15px"}} >{props.headingInfo?props.headingInfo:''}</div>
        </div>
        <div class="col-6" style={{fontFamily: "'Rubik', sans-serif",fontSize:"16px",textAlign: "center"}}>
          {(props.heading === 'backdrop_path' || props.heading === 'poster_path')?<img src={imagePath} style={{margin:"0 0 3rem 0",width:"100%",height: "auto"}}/>:(props.heading === 'language' || props.heading === 'original_language')?getLanguageName(props.value):props.value}
        </div>
      </div>
      <hr style={{backgroundColor:"white"}}/>
    </React.Fragment>
  );
}
