import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  signIn = async () => {};

  signOut = () => {};

  render() {
    /**
     * value object provides the utility methods of the class Data.
     */
    const value = {
      data: this.data,
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
