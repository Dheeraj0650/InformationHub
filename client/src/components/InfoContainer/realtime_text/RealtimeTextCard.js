import './RealtimeTextCard.css';
import React from 'react';

export default function(props){
  return (
      <div class="col-md-6 col-lg-4 column">
          <div class={props.card_group}>
            <div class="txt">
              <h1>BRANDING AND <br></br>
    CORPORATE DESIGN</h1>
              <p>Visual communication and problem-solving</p>
            </div>
            <a href="#">more</a>
            <div class="ico-card">
              <i class={props.status}></i>
            </div>
          </div>
      </div>
  )
}
