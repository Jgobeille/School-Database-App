import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from './Form.js';

/**
 * Creates course for authenticated user
 */
export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  };

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

    const { context, history } = this.props;

    const { data, authenticatedUser } = context;

    // decode password
    const decodedPassword = atob(authenticatedUser.password);

    const userId = authenticatedUser.id;
    const email = authenticatedUser.emailAddress;
    const password = decodedPassword;

    // New user payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    /**
     * CreateCourse method sends request to API using input course data and userAuth
     *
     * @param {object} Course - Contains all course information to be submitted to API
     * @param {string} email - user email
     * @param {string} password - users decoded password
     *
     */

    data
      .createCourse(course, email, password)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          history.push('/');
        }
      })
      .catch(err => {
        // handle rejected promises

        console.log(err);
        history.push('/error'); // push to history stack
      });
  };

  cancel = () => {
    const { history } = this.props;
    history.push('/');
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
      <div className="bounds">
        <h1 className="course--page--name">Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
      </div>
    );
  }
}

CreateCourse.propTypes = {
  context: PropTypes.object,
  history: PropTypes.object,
};
