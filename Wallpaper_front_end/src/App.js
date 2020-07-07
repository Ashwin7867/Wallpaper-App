import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Provider} from 'react-redux';
import store from './redux/store';

import Login from './components/Login';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen';
import Favorites from './components/Favorites';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

class App extends React.Component{
  render(){
      return (
        <Provider store = {store}>
        <Router>
        <div className="App">
            <Switch>
              <Route exact path = '/' component = {Login} />
              <Route path = '/signup' component = {SignUp} />
              <Route path = '/homescreen' component = {HomeScreen} />
              <Route path = '/favorites' component = {Favorites} />
              <Route render={({ location }) => (
                  <div className='ui inverted red segment'>
                    <h3>
                      Error! No matches for <code>{location.pathname}</code>
                    </h3>
                  </div>
        )} />
            </Switch>
        </div>
        </Router>
      </Provider>  
      );
}
}

export default App;
