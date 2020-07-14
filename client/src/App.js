import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route exact path="/courses/:id" component={CourseDetails} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
