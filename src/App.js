import React from 'react';
import './App.css';
import Calculator from './Component/Calculator/Calculator'
import NavBar from './Component/HomePage/NavBar';
import Home from './Component/HomePage/Home/Home';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Calculator2 from './Component/Calculator2/Calculator2';
import Calculator3 from './Component/Calculator3/Calculator3';
import Footer from './Component/HomePage/Footer/Footer'
import FetchResult from './Component/SavedResult/FetchResult/FetchResult'

function App() {
  return (
    <Router>
        <div className="App">
          <div className='main-content'>
            <NavBar />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/freefall' exact component={Calculator} />
                <Route path='/fuelconsumption' exact component={Calculator2} />
                <Route path='/electricitycalculator' exact component={Calculator3} />
                <Route path='/savedresults' exact component={FetchResult} />
            </Switch>
            <Footer />
          </div>
        </div>
    </Router>
  );
}

export default App;
