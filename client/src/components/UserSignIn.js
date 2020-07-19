/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form.js';

/**
 * Renders a sign in page
 */

export default class UserSignIn extends Component {
  state = {
    email: '',
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
    const { context, history, location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { email, password } = this.state;

    console.log(password);
    context.actions
      .signIn(email, password)
      .then(user => {
        if (user === undefined) {
          this.setState(() => ({ errors: ['Sign-in was unsuccessful'] }));
        } else {
          history.push(from);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('./error');
      });
  };

  cancel = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.change}
                  placeholder="Email"
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
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}
