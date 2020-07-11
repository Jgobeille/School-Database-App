import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Form from "./Form.js";

/**
 * Renders a signUp Page
 */

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  };

  render() {
    const { name, username, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          {/* <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.change}
                  placeholder="Name"
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
          /> */}
          <form>
            <div>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                className=""
                placeholder="Email Address"
                value=""
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                className=""
                placeholder="Password"
                value=""
              />
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Sign In
              </button>
              {/* // eslint-disable-next-line react/button-has-type */}
              <button className="button button-secondary" type="submit">
                Cancel
              </button>
            </div>
          </form>
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}
