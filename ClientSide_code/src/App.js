import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentList from './StudentList';
import StudentEdit from './StudentEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/stdents' exact={true} component={StudentList}/>
          <Route path='/student/:id' component={StudentEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;