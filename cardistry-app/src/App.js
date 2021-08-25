import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {Container, Row} from "react-bootstrap";
import {SideBar} from './Components/SideBar/sidebar.js';
import {TitleBar} from './Components/TitleBar/titleBar';

import {HomePage} from './Pages/HomePage';
import {AboutPage} from './Pages/AboutPage';
import {ComboPage} from './Pages/ComboPage';
import {RecsPage} from './Pages/RecsPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Container fluid>
        <Row>
            <div className="col-sm-2">
                <div>
                    <SideBar/>
                </div>
            </div>

            <div className="col-sm-10">
              <TitleBar/>
              
              <Router>
                <Switch>

                  <Route exact path='/'>
                    <HomePage/>
                  </Route>

                  <Route path='/about'>
                    <AboutPage/>
                  </Route>

                  <Route path='/combos'>
                    <ComboPage/>
                  </Route>

                  <Route path='/recommendations'>
                    <RecsPage/>
                  </Route>

                </Switch>
              </Router>
            </div>
        </Row>
    </Container>
    </div>
  );
}

export default App;
