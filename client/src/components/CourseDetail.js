/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import PopUp from './PopUp.js';
import Loader from './Loader.js';

/**
 * Renders the description and details of a course
 */

export default class CourseDetails extends Component {
  state = {
    courseDetails: '',
    seen: false,
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

  togglePop = () => {
    this.setState(prevState => ({
      seen: !prevState.seen,
    }));
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
            {this.state.seen ? (
              <PopUp deleteCourse={this.deleteCourse} />
            ) : null}
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid">
                  {authenticatedUser &&
                  authenticatedUser.id === courseDetails.userId ? (
                    <span className="actions--bar--buttons">
                      <Link className="button" to={updateURL}>
                        Update Course
                      </Link>
                      <button
                        className="button"
                        type="submit"
                        onClick={this.togglePop}
                      >
                        Delete Course
                      </button>
                      <Link className="button button-secondary" to="/">
                        Return to List
                      </Link>
                    </span>
                  ) : (
                    <span className="actions--bar--only-button">
                      <Link className="button button-secondary" to="/">
                        Return to List
                      </Link>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{courseDetails.title}</h3>
                  <p>By: {user ? `${user.firstName} ${user.lastName}` : ''}</p>
                </div>
                <div className="course--description">
                  <ReactMarkdown>{courseDetails.description}</ReactMarkdown>
                </div>
              </div>
              <div className="grid">
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
          <Loader />
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
