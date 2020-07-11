import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Course from './Course.js';

/**
 * Renders home page with list of courses
 */

export default class Courses extends Component {
  render() {
    return (
      <div className="bounds">
        {/* Loop over all the courses and pass info into course container */}
        <Course />
        <div className="grid-33">
          <Link className="course--module course--add--module" to="/create">
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
