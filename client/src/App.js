import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  }
  render() {
    return (
      <div>
        <h1> Hello</h1>
      </div>
    );
  }
}

export default App;
