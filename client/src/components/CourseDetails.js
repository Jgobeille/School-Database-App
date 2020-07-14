import React, { Component } from 'react';

import CourseDetailsActionsBar from './CourseDetailsActionsBar.js';

/**
 * Renders the description and details of a course
 */

export default class CourseDetails extends Component {
  state = {
    courseDetails: '',
  };

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { context } = this.props;
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    context.data.getCourse(match.url).then(courseData =>
      this.setState({
        courseDetails: courseData.course,
      })
    );
  }

  render() {
    const { courseDetails } = this.state;
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;

    const updateURL = `${match.url}/update`;

    const { user } = courseDetails;
    let materials;

    if (courseDetails.materialsNeeded) {
      materials = courseDetails.materialsNeeded.split('*');
    }

    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line react/prop-types;
    return (
      <React.Fragment>
        <CourseDetailsActionsBar url={updateURL} />
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{courseDetails.title}</h3>
              <p>By: {user ? `${user.firstName} ${user.lastName}` : ''}</p>
            </div>
            <div className="course--description">
              <p>{courseDetails.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{courseDetails.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {materials
                      ? materials
                          .slice(1)
                          .map((material, id) => <li key={id}>{material}</li>)
                      : ''}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
