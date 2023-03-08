import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { ROLE } from '../../api/role/Role';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const roleOptions = [
  { label: 'Student', value: 'STUDENT' },
];
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    let collectionName;
    switch (doc.role) {
    case 'OFFICE':
      collectionName = OfficeProfiles.getCollectionName();
      break;
    case 'FACULTY':
      collectionName = FacultyProfiles.getCollectionName();
      break;
    case 'STUDENT':
      collectionName = StudentProfiles.getCollectionName();
      break;
    case 'ITSUPPORT':
      collectionName = ITSupportProfiles.getCollectionName();
      break;
    default:
      collectionName = UserProfiles.getCollectionName();
    }
    const definitionData = doc;
    definitionData.role = doc.role;
    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        // log the new user in.
        const { email, password } = doc;
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            setError(err.reason);
          } else {
            setRedirectToRef(true);
          }
        });
      })
      .catch((err) => setError(err.reason));
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) {
      return (<Navigate to="/admin-home" />);
    }
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.USER])) {
      return (<Navigate to="/home" />);
    }
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT])) {
      return (<Navigate to="/student-home" />);
    }
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.FACULTY])) {
      return (<Navigate to="/faculty-home" />);
    }
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.ITSUPPORT])) {
      return (<Navigate to="/itsupp-home" />);
    }
    if (Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE])) {
      return (<Navigate to="/office-home" />);
    }
  }
  return (
    <Container id={PAGE_IDS.SIGN_UP} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" placeholder="First name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" placeholder="Last name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="E-mail address" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <SelectField id={COMPONENT_IDS.SIGN_UP_FORM_ROLE} name="role" placeholder="Select role" options={roleOptions} />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Already have an account? Login <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
