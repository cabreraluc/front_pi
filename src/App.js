import './App.css';
import {Route} from "react-router-dom"
import LandingPage from "./components/LandingPage.jsx"
import MainPage from "./components/MainPage"
import CreatePokemon from './components/CreatePokemon';

import React from 'react';
import CardDetails from "./components/CardDetails"
import Trash from './components/Trash';



function App() {



  return (
    <div className="App">
    
        <Route exact path="/Trash" component={Trash}/> 
        <Route exact path="/" component={LandingPage}/> 
        <Route path="/MainPage" component={MainPage} />
        <Route exact path = "/CreatePokemon" component={CreatePokemon}/>
        <Route path="/Pokemons/:id" component={CardDetails}/>
        
  
    </div>
  );
}

export default App;
