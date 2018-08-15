import React, { Component } from 'react';
import './App.css';
//import './styles/style.css'
import {Switch, Route} from 'react-router-dom';
import Views from './components/Views';
import Viewform from './components/Viewform';
import ViewDetails from './components/ViewDetails';

class App extends Component {
  render() {
    return (
      <div>
        <div id="primary-nav-viewer" role="navigation">
          <a href="http://dslab.digitalscholar.rochester.edu/projects" className="nav-viewer-home-icon">Digital Scholarship Lab Projects</a>
            <ul className="navigation">
              <li>
                <a href="/projects/three-browse">3D Objects</a>
              </li>
            </ul>
            <div className="viewer-nav-search">
              <form
                id="search-form"
                name="search-form"
                action="/projects/search"
                method="get">
                <input
                  type="text"
                  name="query"
                  id="query"
                  value=""
                  title="Search"/>
                <input
                  type="hidden"
                  name="query_type"
                  value="keyword"
                  id="query_type"/>
                <input
                  type="hidden"
                  name="record_types[]"
                  value="Item"
                  id="record_types"/>
                <input
                  type="hidden"
                  name="record_types[]"
                  value="File"
                  id="record_types"/>
                <input
                  type="hidden"
                  name="record_types[]"
                  value="Collection"
                  id="record_types"/>
                <button
                  name="submit_search"
                  id="submit_search"
                  type="submit"
                  value="Search">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>
              <a
                alt="advanced search"
                title="Advanced Search"
                className="viewer-nav-search-advanced-link"
                href="/projects/items/search">
                <i className="fa fa-ellipsis-h fa-lg" aria-hidden="true"></i>
              </a>
            </div>
        </div>
        <div className='app-root-container'>
          <div className='ui container'>
            <Switch>
              <Route exact path='/' component={Views}/>
              <Route path='/viewform' component={Viewform}/>
              <Route path='/viewDetails/:id' component={ViewDetails}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
