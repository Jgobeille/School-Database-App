import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

import CourseContainer from './CourseContainer.js';

/**
 * Renders home page with list of courses
 */

export default class Courses extends Component {
  state = {
    courses: '',
  };

  componentDidMount() {
    this.getCourses();
  }

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data =>
        this.setState({
          courses: data.courses,
        })
      );
    }
    if (response.status === 401) {
      return null;
    }

    throw new Error();
  }

  // eslint-disable-next-line class-methods-use-this
  api(path, method = 'GET', body = null) {
    // concatenates the path request with the base url
    const url = config.apiBaseUrl + path;

    // sends a request with the HTTP method, as well as the request headers and a stringified body (if body is provided).
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { courses } = this.state;
    console.log(courses);
    return (
      <div className="bounds">
        {/* Loop over all the courses and pass info into course container */}
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
