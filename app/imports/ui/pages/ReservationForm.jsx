import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Stuffs } from '../../api/stuff/StuffCollection';

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
    StartTime: String,
    EndTime: String,
    RecurringMeeting: {
      type: String,
      allowedValues: ['one-time', 'daily', 'weekly', 'biweekly', 'monthly'],
      defaultValue: 'one-time',
    },
    Attendance: Number,
    Usage: String,
    DesignatedAdvisor: {
      type: String,
      allowedValues: ['N/A', 'Carleton Moore', 'Philip Johnson', 'Scott Robertson', 'Dan Suthers', 'Henri Casanova'],
      defaultValue: 'N/A',
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // On submit, insert the data.

  const submit = (data, formRef) => {
    // const { name, quantity, condition } = data;
    // const owner = Meteor.user().username;
    // const collectionName = Stuffs.getCollectionName();
    // const definitionData = { name, quantity, condition, owner };
    // defineMethod.callPromise({ collectionName, definitionData })
    //     .catch(error => swal('Error', error.message, 'error'))
    //     .then(() => {
    //       swal('Success', 'Item added successfully', 'success');
    //       formRef.reset();
    //     });
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
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <SelectField name="Room" />
                <DateField name="StartTime"/>
                <DateField name="EndTime"/>
                <SelectField name="RecurringMeeting" placeholder="" />
                <TextField name="Attendance" placeholder="" />
                <TextField name="Usage" placeholder="" />
                <SelectField name="DesignatedAdvisor" placeholder="N/A" />
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
