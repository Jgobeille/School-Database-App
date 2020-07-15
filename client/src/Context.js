import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: null,
  };

  /**
   * The signIn function is an asynchronous function that takes a email and password as arguments.
   * signIn uses those credentials to call the getUser() method in Data.js, which makes a GET request
   * to the protected /users route on the server and returns the user data.
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {object} user - Authenticated User Credentials
   */
  signIn = async (email, password) => {
    const user = await this.data.getUser(email, password);
    if (user !== null) {
      this.setState(() => ({
        authenticatedUser: user,
      }));
    }

    return user;
  };

  signOut = () => {
    this.setState(() => ({
      authenticatedUser: null,
    }));
  };

  render() {
    const { authenticatedUser } = this.state;
    /**
     * value object provides the utility methods of the class Data.
     */
    const value = {
      authenticatedUser,
      data: this.data,
      /*
      Provider's value prop an actions object to store any event handlers
      or actions you want to perform on data that's passed down through context.
      */
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }
}

export const { Consumer } = Context;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

// eslint-disable-next-line no-shadow
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}