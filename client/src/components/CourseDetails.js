import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    const { match, context } = this.props;

    const updateURL = `${match.url}/update`;

    const { user } = courseDetails;

    let materials;

    if (courseDetails.materialsNeeded) {
      materials = courseDetails.materialsNeeded.split('*');
    }

    // eslint-disable-next-line react/destructuring-assignment
    // eslint-disable-next-line react/prop-types;
    return (
      <div>
        {courseDetails ? (
          <React.Fragment>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {context.authenticatedUser &&
                  context.authenticatedUser.id === courseDetails.userId ? (
                    <span>
                      <Link className="button" to={updateURL}>
                        Update Course
                      </Link>
                      <Link className="button" to="/">
                        Delete Course
                      </Link>
                      <Link className="button button-secondary" to="/">
                        Return to List
                      </Link>
                    </span>
                  ) : (
                    <Link className="button button-secondary" to="/">
                      Return to List
                    </Link>
                  )}
                </div>
              </div>
            </div>
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
                              .map((material, id) => (
                                <li key={id}>{material}</li>
                              ))
                          : ''}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div>Waiting...</div>
        )}
      </div>
    );
  }
}
