import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders each specific course
 */

const Course = () => (
  <div className="grid-33">
    <Link className="course--module course--link" to="/courses/1">
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">Build a Basic Bookcase</h3>
    </Link>
  </div>
);

export default Course;
