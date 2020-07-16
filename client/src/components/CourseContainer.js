import React from 'react';
import Course from './Course.js';
/**
 * Renders each specific course
 */

// eslint-disable-next-line react/prop-types
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

export default CourseContainer;
