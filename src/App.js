import React from 'react';
import './App.css';


import Nav from './components/Nav/Nav';
import Planner from './components/Planner/Planner';
import List from './components/List/List';
import Recipes from './components/Recipes/Recipes';
import Landing from './components/Landing/Landing';

var dashboard = (
  <div className="module-container">

    <Planner/>
    <List/>
    <Recipes />
    
  </div>
);

function App() {
  return (
    <div>

      <Nav />

      {1 ? ( dashboard ) : ( <Landing /> )}

    </div>
  );
}

export default App;
