import React from 'react';
import Course from './Course.js';
/**
 * Renders each specific course
 */

// eslint-disable-next-line react/prop-types
const CourseContainer = ({ courses }) => {
  if (courses) {
    console.log(courses);
    return courses.map(course => (
      <Course
        key={course.id}
        title={course.title}
        url={`/courses/${course.id}`}
      />
    ));
  }
  return <div>Waiting...</div>;
};

export default CourseContainer;
