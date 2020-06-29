import React, { Component } from 'react';
import './App.css';
import Router from './routers/router';
import './assets/css/styles_auth.css';
import './assets/css/styles_chat.css';
import http from './helpers/http';
import ChatSocket from './sockets/chat_socket';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = async () => {
    await new http().init(); // setup http config
    new ChatSocket();
  };

  render() {
    return (
      <div >
        <Router />
      </div>
    );
  }
}

export default App;
