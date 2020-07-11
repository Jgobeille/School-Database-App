import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import styling
import './App.css';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => {
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
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/create" component={CreateCourse} />
            <Route path="/details" component={CourseDetails} />
            <Route path="/update" component={UpdateCourse} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
