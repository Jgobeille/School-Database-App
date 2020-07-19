import React from 'react';
import PropTypes from 'prop-types';
import Course from './Course.js';
/**
 * Renders each specific course
 */

const CourseContainer = ({ courses }) => (
  <React.Fragment>
    {courses ? (
      courses.map(course => (
        <Course
          key={course.id}
          title={course.title}
          url={`/courses/${course.id}`}
        />
      ))
    ) : (
      <div>Waiting...</div>
    )}
  </React.Fragment>
);

CourseContainer.propTypes = {
  courses: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default CourseContainer;
