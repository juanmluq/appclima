import React, { useState } from 'react';

import './App.css';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import About from '../components/About';
import Ciudad from '../components/Ciudad';
import { Route, Switch } from 'react-router-dom';
const apiKey = process.env.REACT_APP_APIKEY;
//const apiKey = '4ae2636d8dfbdc3044bede63951a019b';

function App() {
  const [cities, setCities] = useState([]);
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }
  function onSearch(ciudad) {// con esta funcion busco la ciudad para mostrarla en pantalla
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
      .then(r => r.json()) 
      .then((recurso) => { 
      //despues tengo otra funcion que me dice si respuesta.main es distinta de undefined creo un 
        //objeto ciudad con info del clima 
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => [...oldCities, ciudad]); //funcion que le paso oldCities y creo un arreglo con las oldcities y pusheo la ciudad
        } else {
          alert("Ciudad no encontrada");// si la respuesta.main es undefined mando el alerta
        }
      });
  }
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    //paseInt se asegura que la ciudadId que recibe sea un entero
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
    // otra forma de hacer esta funcion es: return cities.find((c => c.id === parseInt(ciudadId))
  }

  return (
    <div className="app">
      <Nav onSearch={onSearch}/>

      <Switch >
      <Route exact path="/"> 
        <Cards
          cities={cities}
          onClose={onClose}
        />
        </Route>

      <Route path="/about"><About/></Route>  
      <Route path="/ciudad/:id" render={({match})=>
      <Ciudad city={onFilter(match.params.id)} /> } /> 
     </Switch>
    </div>
  );
}

export default App;
