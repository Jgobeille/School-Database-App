/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form.js';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  };

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

    const { data } = context;

    const encodedPassword = atob(context.authenticatedUser.password);

    const userId = context.authenticatedUser.id;
    const email = context.authenticatedUser.emailAddress;
    const password = encodedPassword;

    // New user payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

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

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
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
                      By: {context.authenticatedUser.firstName}{' '}
                      {context.authenticatedUser.lastName}{' '}
                    </p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        className=""
                        placeholder="Course description..."
                      />
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
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
                            value={estimatedTime}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      </div>
    );
  }
}
