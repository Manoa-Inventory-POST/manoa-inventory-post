import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const ReservationForm = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    Room: {
      type: String,
      allowedValues: ['319', '318A', '318B', '316', '315'],
      defaultValue: '319',
    },
    Duration: String,
    Attendance: Number,
    Usage: String,
    DesignatedAdvisor: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    // const collectionName = UserProfiles.getCollectionName();
    // const definitionData = doc;
    // // create the new UserProfile
    // defineMethod.callPromise({ collectionName, definitionData })
    //   .then(() => {
    //     // log the new user in.
    //     const { email, password } = doc;
    //     Meteor.loginWithPassword(email, password, (err) => {
    //       if (err) {
    //         setError(err.reason);
    //       } else {
    //         setError('');
    //         setRedirectToRef(true);
    //       }
    //     });
    //   })
    //   .catch((err) => setError(err.reason));
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  // if correct authentication, redirect to from: page instead of signup screen
  // if (redirectToReferer) {
  //   return <Navigate to="/add" />;
  // }
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Reserve Now</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="Room" placeholder="#" />
                <TextField name="Duration" placeholder="YYMMDDHH" />
                <TextField name="Attendance" placeholder="" />
                <TextField name="Usage" placeholder="" />
                <TextField name="DesignatedAdvisor" placeholder="N/A" />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} className="text-center" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;
