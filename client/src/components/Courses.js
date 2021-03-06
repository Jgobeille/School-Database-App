import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CourseContainer from './CourseContainer.js';

/**
 * Renders home page with list of courses
 */

export default class Courses extends Component {
  state = {
    courses: '',
  };

  componentDidMount() {
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
        history.push('/error'); // push to history stack
      });
  }

  render() {
    const { courses } = this.state;
    return (
      <div className="container">
        <CourseContainer courses={courses} />
        {courses ? (
          <div className=" grid course-item">
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
        ) : (
          ''
        )}
      </div>
    );
  }
}

Courses.propTypes = {
  context: PropTypes.object,
  history: PropTypes.object,
};
