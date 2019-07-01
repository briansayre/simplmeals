import React from 'react';
import './App.css';


import Nav from './components/Nav/Nav';
import Planner from './components/Planner/Planner';
import List from './components/List/List';
import Recipes from './components/Recipes/Recipes';


function App() {
  return (
    <div>

      <Nav />


      <div className="module-container">

        <Planner/>
        <List/>
        <Recipes />
        
      </div>

    </div>
  );
}

export default App;
