/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';

const UserSignOut = ({ context }) => {
  const { actions } = context;
  actions.signOut();

  return <Redirect to="/" />;
};

export default UserSignOut;
