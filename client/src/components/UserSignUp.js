import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from './Form.js';

/**
 * Renders a signUp Page
 */

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
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
    const { firstName, lastName, email, username, password } = this.state;

    const { context, history } = this.props;

    const { actions, data } = context;

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress: email,
      username,
      password,
    };

    data
      .createUser(user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          actions.signIn(email, password).then(() => {
            history.push('/');
          });
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
      firstName,
      lastName,
      email,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid centered-signin signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={this.change}
                  placeholder="Email"
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.change}
                  placeholder="User Name"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />

          <p className="signin-signup">
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}

UserSignUp.propTypes = {
  context: PropTypes.object,
  history: PropTypes.object,
};
