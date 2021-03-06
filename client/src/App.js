import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UnhandledError from './components/UnhandledError';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Course context routes
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CoursesDetailWithContext = withContext(CourseDetail);

// User context routes
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

// Other Components with context
const HeaderWithContext = withContext(Header);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderWithContext />
          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path="/error" component={UnhandledError} />
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/forbidden" component={Forbidden} />
            <PrivateRoute
              path="/courses/create"
              component={CreateCourseWithContext}
            />
            <Route
              exact
              path="/courses/:id"
              component={CoursesDetailWithContext}
            />
            <PrivateRoute
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
