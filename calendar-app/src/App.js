import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Calendar />
      </div>
    );
  }
}

export default App;
