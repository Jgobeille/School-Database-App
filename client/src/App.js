import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import CreateCourse from './components/CreateCourse';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';

import withContext from './Context';

// Context routes
const CoursesWithContext = withContext(Courses);
const CoursesDetailsWithContext = withContext(CourseDetails);
const UpdateCourseWithContext = withContext(UpdateCourse);

const UserSignUpWithContext = withContext(UserSignUp);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route
              exact
              path="/courses/:id"
              component={CoursesDetailsWithContext}
            />
            <Route
              path="/courses/:id/update"
              component={UpdateCourseWithContext}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
