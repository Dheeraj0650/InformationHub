import Card from '../containerCard';
import React from 'react';
import WeatherData from './WeatherData';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router ,Switch ,Route} from 'react-router-dom';

export default function WeatherCard(){
  return(
      <React.Fragment>
          <NavLink to = {`/method_1`}><Card name="method_1" image="url(./location.png)" bgColor="#AE00FB" info="Get complete weather data at particular location using location coordinates" heading="Location Coordinates"/></NavLink>
          <NavLink to = {`/method_2`}><Card name="method_2" image="url(./city.webp)" bgColor="#FB9300" info="Get complete weather data at particular location using city name" heading="City Name" /></NavLink>
          <NavLink to = {`/method_3`}><Card name="method_3" image="url(./pollution.jpg)" bgColor="#BB8760" info="Get complete air pollution data at particular location using location coordinates" heading="Air Pollution" /></NavLink>
          <NavLink to = {`/method_4`}><Card name="method_4" image="url(./location-1.png)" bgColor="#00C1D4" info="Get complete geocoding data of particular location" heading="Geocoding" /></NavLink>
      </React.Fragment>
  );
}
