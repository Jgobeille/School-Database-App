import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders update, delete, and return to home buttons
 */

// eslint-disable-next-line react/prop-types
const CourseDetailsActionBar = ({ url }) => (
  <div className="actions--bar">
    <div className="bounds">
      <div className="grid-100">
        <span>
          <Link className="button" to={url}>
            Update Course
          </Link>
          <Link className="button" to="/">
            Delete Course
          </Link>
        </span>
        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div>
  </div>
);

export default CourseDetailsActionBar;
