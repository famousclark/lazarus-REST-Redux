import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Views from './components/Views';
import Viewform from './components/Viewform';
import ViewDetails from './components/ViewDetails';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Views}/>
          <Route path='/viewform' component={Viewform}/>
          <Route path='/viewDetails/:id' component={ViewDetails}/>
        </Switch>
      </div>
    );
  }
}

export default App;
