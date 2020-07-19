import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Renders each specific course
 */

const Course = ({ title, url }) => (
  <div className="grid-33">
    <Link className="course--module course--link" to={url}>
      <h4 className="course--label">Course</h4>
      <h3 className="course--title">{title}</h3>
    </Link>
  </div>
);

Course.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default Course;
