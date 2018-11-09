import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import QuoteBox from '../QuoteBox'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Looking for inspiration? Click through the messages below!
        </header>
        <QuoteBox />
      </div>
    );
  }
}

export default App;
