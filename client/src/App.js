import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import styling
import "./App.css";

// Import Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import userSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";

class App extends Component {
  componentDidMount() {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  }
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
