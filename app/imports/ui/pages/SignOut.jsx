import React from 'react';
import { Meteor } from 'meteor/meteor';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return (
    <Col id={PAGE_IDS.SIGN_OUT} className="text-center py-3">
      <h2>You are signed out.</h2>
      <Link className={COMPONENT_IDS.SIGN_OUT_RETURN} to="/">Return to home page.</Link>
    </Col>
  );
};

export default SignOut;
