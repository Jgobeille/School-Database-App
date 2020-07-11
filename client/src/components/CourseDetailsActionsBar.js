import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Renders update, delete, and return to home buttons
 */

const CourseDetailsActionBar = () => (
  <div className="actions--bar">
    <div className="bounds">
      <div className="grid-100">
        <span>
          <Link className="button" to="/courses/1/update">
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
