import React, { PureComponent } from 'react';

/**
 * Renders the header of the app
 */

export default class Header extends PureComponent {
  render() {
    /**
     * The value of authUser is either an object holding the authenticated user's name and username values, or null.
     * In the return statement we'll conditionally render the header nav content based on the value of authUser
     * (the authenticatedUser state).
     */

    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Little Home School</h1>
          <nav>
            <React.Fragment>
              <span>Welcome, Bro!</span>
              <Link to="/signout">Sign Out</Link>
            </React.Fragment>
          </nav>
        </div>
      </div>
    );
  }
}
