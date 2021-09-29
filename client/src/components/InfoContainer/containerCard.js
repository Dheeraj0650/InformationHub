import React, {useEffect} from 'react';
import './InfoContainer.css';

export default function Card(props){
  return(
    <div class="card_1" style={{backgroundImage:props.image}} >
      <div class="info" style = {{backgroundColor:props.bgColor}}>
        <p style={{fontSize:"1.3rem",height:"1rem",fontFamily: "'Noto Sans', sans-serif"}}>{props.heading}</p>
        <p style={{fontSize:"0.9rem"}}>{props.info}</p>
      </div>
    </div>
  )
};
