import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screenif (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) {
  if (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) {
    return (<Navigate to="/admin-home" />);
  }
  if (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.USER])) {
    return (<Navigate to="/home" />);
  }
  if (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT])) {
    return (<Navigate to="/student-home" />);
  }
  if (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.FACULTY])) {
    return (<Navigate to="/faculty-home" />);
  }
  if (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.ITSUPPORT])) {
    return (<Navigate to="/itsupp-home" />);
  }
  if (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.ADVISOR])) {
    return (<Navigate to="/advisor-home" />);
  }
  if (redirect && Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE])) {
    return (<Navigate to="/office-home" />);
  }
  // Otherwise return the Login form.
  return (
    <Container id={PAGE_IDS.SIGN_IN} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Login</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL} name="email" placeholder="E-mail address" />
                <TextField id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Don&apos;t have an account? <Link to="/signup">Signup</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
