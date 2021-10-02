import './MovieCards.css';
import React, {useState} from "react";
import { peopleMovieResult } from '../../../store/index';
import { useDispatch } from 'react-redux';

export default function(props){
  const dispatch = useDispatch();

  const moreOptions = (movies) => {
    dispatch(peopleMovieResult.setMovieResults(movies));
  };

  let image = "url('https://image.tmdb.org/t/p/w500/" + props.details.profile_path + "')";
  return (
      <div class="col-md-6 col-lg-4 column">
        <div class="card_2" style={{backgroundImage:image,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
          <div class="txt">
            <h1>{props.details.name?props.details.name:props.details.title}<br></br><span style={{fontSize:"20px"}}>{props.details.known_for_department}</span></h1>
            <p style={{fontSize:"0.8rem",fontWeight:"400"}}>{props.details.overview}</p>
          </div>
          <a style={{fontSize:"1rem"}} onClick = {() => moreOptions(props.details.known_for)}>more</a>
          <div class="ico-card">
            <i class="fas fa-film"></i>
          </div>
        </div>
      </div>
  )
}
