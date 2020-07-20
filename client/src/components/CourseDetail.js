import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

/**
 * Renders the description and details of a course
 */

export default class CourseDetails extends Component {
  state = {
    courseDetails: '',
  };

  componentDidMount() {
    const { context, match, history } = this.props;
    const { data } = context;
    data
      .getCourse(match.url)
      .then(courseData => {
        if (courseData) {
          this.setState({
            courseDetails: courseData.course,
          });
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        // handle rejected promises

        console.log(err);
        history.push('/notfound'); // push to history stack
      });
  }

  deleteCourse = () => {
    const { context, match, history } = this.props;
    const { data, authenticatedUser } = context;

    // decode password
    const decodedPassword = atob(authenticatedUser.password);

    const { id } = match.params;
    const email = authenticatedUser.emailAddress;
    const password = decodedPassword;

    data
      .deleteCourse(id, email, password)
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        // handle rejected promises

        console.log(err);
        history.push('/error'); // push to history stack
      });
  };

  render() {
    const { courseDetails } = this.state;
    // eslint-disable-next-line react/prop-types
    const { match, context } = this.props;

    const { authenticatedUser } = context;

    const { user } = courseDetails;

    const updateURL = `${match.url}/update`;

    return (
      <div>
        {courseDetails ? (
          <React.Fragment>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {authenticatedUser &&
                  authenticatedUser.id === courseDetails.userId ? (
                    <span>
                      <Link className="button" to={updateURL}>
                        Update Course
                      </Link>
                      <button
                        className="button"
                        type="submit"
                        onClick={this.deleteCourse}
                      >
                        Delete Course
                      </button>
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
                  <ReactMarkdown>{courseDetails.description}</ReactMarkdown>
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
                      <ReactMarkdown>
                        {courseDetails.materialsNeeded}
                      </ReactMarkdown>
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

CourseDetails.propTypes = {
  context: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};
