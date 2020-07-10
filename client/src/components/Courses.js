import React, { Component } from 'react';

import Course from './Course.js';

/**
 * Renders home page with list of courses
 */

export default class Courses extends Component {
  render() {
    return (
      <Div className="bounds">
        {/* Loop over all the courses and pass info into course container */}
        <Course url={} key={} label={} />
      </Div>
    );
  }
}
