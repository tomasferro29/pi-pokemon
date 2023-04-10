import React from 'react';
import Create from './Components/Create.js';
import Detail from './Components/Detail.js';
import Home from './Components/Home.js';
import Landing from './Components/Landing.js';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          {/* <Route path='/create' component={Create} /> */}
          <Route path='/home/:id'>  <Detail/>  </Route> 
       </React.Fragment> 
    </BrowserRouter> 
  );
}

export default App;
