import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from './Form';
import Loader from './Loader.js';

export default class UpdateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    user: '',
    errors: [],
  };

  componentDidMount() {
    const { context, match, history } = this.props;

    const { data } = context;

    data
      .getCourse(`/courses/${match.params.id}/`)
      .then(courseData => {
        if (courseData) {
          this.setState({
            title: courseData.course.title,
            description: courseData.course.description,
            estimatedTime: courseData.course.estimatedTime,
            materialsNeeded: courseData.course.materialsNeeded,
            user: courseData.course.user,
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

  componentDidUpdate() {
    const { context, history } = this.props;
    const { user } = this.state;

    const { authenticatedUser } = context;

    // Logic for forbidden routes
    if (user) {
      if (authenticatedUser.emailAddress !== user.emailAddress) {
        history.push('/forbidden');
      }
    }
  }

  // Updates values stored in state with information entered into form inputs
  change = event => {
    const { name } = event.target;
    const { value } = event.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  submit = () => {
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const { context, history, match } = this.props;

    const { data, authenticatedUser } = context;

    // decode password
    const decodedPassword = atob(authenticatedUser.password);

    const { id } = match.params;
    const userId = authenticatedUser.id;
    const email = authenticatedUser.emailAddress;
    const password = decodedPassword;

    // New user payload
    const course = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    /**
     * CreateCourse method sends PUT request to API using input course data and userAuth
     *
     * @param {object} Course - Contains all course information to be submitted to API
     * @param {string} email - user email
     * @param {string} password - users decoded password
     *
     */

    data
      .updateCourse(course, email, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          const courseDetailsPage = `/courses/${match.params.id}`;
          history.push(courseDetailsPage);
        }
      })
      .catch(err => {
        // handle rejected promises

        console.log(err);
        history.push('/error'); // push to history stack
      });
  };

  cancel = () => {
    const { history, match } = this.props;
    const courseDetailsPage = `/courses/${match.params.id}`;
    history.push(courseDetailsPage);
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const { context } = this.props;

    const { authenticatedUser } = context;

    return (
      <div className="bounds ">
        {title ? (
          <React.Fragment>
            <div>
              <h1 className="course--page--name">Update Course</h1>
              <Form
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                  <div className="course--form">
                    <div className="grid">
                      <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                          <input
                            id="title"
                            name="title"
                            type="text"
                            className="input-title course--title--input"
                            placeholder="Course title..."
                            value={title}
                            onChange={this.change}
                          />
                        </div>
                        <p>
                          By: {authenticatedUser.firstName}{' '}
                          {authenticatedUser.lastName}{' '}
                        </p>
                      </div>
                      <div className="course--description">
                        <div>
                          <textarea
                            id="description"
                            name="description"
                            className=""
                            placeholder="Course description..."
                            onChange={this.change}
                            value={description}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid">
                      <div className="course--stats">
                        <ul className="course--stats--list">
                          <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div>
                              <input
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                className="course--time--input"
                                placeholder="Hours"
                                onChange={this.change}
                                value={estimatedTime}
                              />
                            </div>
                          </li>
                          <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div>
                              <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                className=""
                                placeholder="List materials..."
                                onChange={this.change}
                                value={materialsNeeded}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          </React.Fragment>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

UpdateCourse.propTypes = {
  context: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};
