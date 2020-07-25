import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Renders each specific course
 */

const Course = ({ title, url, firstName, lastName }) => (
  <div className="grid course-item">
    <Link className="course--module course--link" to={url}>
      <h4 className="course--label">Course</h4>
      <h4 className="course--label">
        By: {firstName} {lastName}
      </h4>
      <h3 className="course--title">{title}</h3>
    </Link>
  </div>
);

Course.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default Course;
