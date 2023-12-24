import Card from '../containerCard';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router ,Switch ,Route} from 'react-router-dom';

export default function NasaCard(){
  return(
      <React.Fragment>
          <NavLink to = {`/method_5`}><Card name="method_5" image="url(./nasa_1.png)" bgColor="#AE00FB" info="Use this API to access the NASA Image and Video Library site at images.nasa.gov." heading="NASA Image"/></NavLink>
          <NavLink to = {`/method_6`}><Card name="method_6" image="url(./mars_rover.webp)" bgColor="#FB9300" info="This API is designed to collect image data gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars" heading="Mars Rover Photos" /></NavLink>
          <NavLink to = {`/method_7`}><Card name="method_7" image="url(./apod.jpg)" bgColor="#BB8760" info="One of the most popular websites at NASA is the Astronomy Picture of the Day." heading=" Astronomy Picture of the Day" /></NavLink>
      </React.Fragment>
  );
}
