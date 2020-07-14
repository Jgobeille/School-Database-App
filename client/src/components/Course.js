import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders each specific course
 */

// eslint-disable-next-line react/prop-types
const Course = ({ title, url }) => (
  <div className="grid-33">
    <Link className="course--module course--link" to={url}>
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{title}</h3>
    </Link>
  </div>
);

export default Course;
