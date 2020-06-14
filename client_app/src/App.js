import React, { Component } from 'react';
import './App.css';
import Router from './routers/router';
import './assets/css/styles_auth.css';
import './assets/css/styles_chat.css';
class App extends Component {
  // componentDidUpdate() {
  //   window.scrollTo(0, 0)
  // }
  render() {
    return (
      <Router />
    );
  }
}

export default App;
