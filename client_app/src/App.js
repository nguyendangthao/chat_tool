import React, { Component } from 'react';
import './App.css';
import Router from './routers/router';
import './assets/css/stylecustom.scss'
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
