import './RealtimeTextCard.css';
import React from 'react';
import {realtimeTextResult} from '../../../store/index';
import { useDispatch, useSelector} from 'react-redux';

export default function(props){
  const dispatch = useDispatch();

  const moreOptions = (data) => {
    dispatch(realtimeTextResult.setRealtimeText(data));
  };

  return (
      <div class="col-md-6 col-lg-4 column">
          <div class={props.card_group}>
            <div class="txt">
              <h1><span style={{"-webkitTextStroke":"0.5px"}}>{props.title}</span><br></br>
    <span style={{fontSize:"1.2rem"}}>{props.name}</span></h1>
              <p>{props.details}</p>
            </div>
            <a onClick = {() => moreOptions(props.data)}>more</a>
            <div class="ico-card">
              <i class={props.status}></i>
            </div>
          </div>
      </div>
  )
}
