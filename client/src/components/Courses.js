import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseContainer from './CourseContainer.js';

/**
 * Renders home page with list of courses
 */

export default class Courses extends Component {
  state = {
    courses: '',
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { context, history } = this.props;
    context.data
      .getCourses()
      .then(courseData =>
        this.setState({
          courses: courseData.courses,
        })
      )
      .catch(err => {
        // handle rejected promises

        console.log(err);
        history.push('/errors'); // push to history stack
      });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { courses } = this.state;
    return (
      <div className="bounds">
        <CourseContainer courses={courses} />
        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}
