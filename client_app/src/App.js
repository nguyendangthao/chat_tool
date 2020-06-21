import React, { Component } from 'react';
import './App.css';
import Router from './routers/router';
import './assets/css/styles_auth.css';
import './assets/css/styles_chat.css';
import http from './helpers/http';
class App extends Component {
  // componentDidUpdate() {
  //   window.scrollTo(0, 0)
  // }
  componentWillMount = async () => {
    await new http().init(); // setup http config
  };
  render() {
    return (
      <Router />
    );
  }
}

export default App;
