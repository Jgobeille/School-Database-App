import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Renders the header of the app
 *
 *
 */

export default class Header extends PureComponent {
  render() {
    /**
     * The value of authUser is either an object holding the authenticated user's name and username values, or null.
     * In the return statement we'll conditionally render the header nav content based on the value of authUser
     * (the authenticatedUser state).
     */
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className="header">
        <div className="header-container">
          <h1 className="header--logo">
            <Link to="/">Little Home School</Link>
          </h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>
                  Welcome, {authUser.firstName} {authUser.lastName} !
                </span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">
                  Sign Up
                </Link>
                <Link className="signin" to="/signin">
                  Sign In
                </Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  context: PropTypes.object,
};
