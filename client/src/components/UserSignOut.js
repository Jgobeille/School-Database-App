import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserSignOut = ({ context }) => {
  const { actions } = context;

  /* 
  This is a React Hook that waits until after the DOM is rendered and then signs the user out. 
  Without this hook, the actions method tries to signout before the DOM is rendered which shoots
  a warning from the React Library. 

  Another solution is to make this component a class and add the componentDidMount React life method
  to run the signout method once the component is mounted to the page.

  React docs can be found here:
  https://reactjs.org/docs/hooks-effect.html

  
  */
  useEffect(() => {
    actions.signOut();
  });

  return <Redirect to="/" />;
};

UserSignOut.propTypes = {
  context: PropTypes.object,
};

export default UserSignOut;
