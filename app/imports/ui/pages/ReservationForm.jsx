import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
  SelectField,
  DateField,
  LongTextField, HiddenField,
} from 'uniforms-bootstrap5';
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
    applicantId: {
      type: String,
      // defaultValue: Meteor.user().username, // need to update upon
      defaultValue: 'john@hawaii.edu', // need to update upon discussion

    },
    createdAt: Date,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { startTime, endTime, attendance, usage, recurrence, createdAt } = data;
    const applicantId = Meteor.user().username;
    const definitionData = { startTime, endTime, attendance, usage, recurrence, createdAt, applicantId };
    defineMethod.callPromise({ definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Reservation submitted successfully', 'success');
        formRef.reset();
      });
  };

  /* Display the reserve form. */
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Reserve Now</h2>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><SelectField name="Room" showInlineError /></Col>
                  <Col><TextField name="Attendance" showInlineError placeholder="" /></Col>
                </Row>
                <Row>
                  <Col><DateField name="StartTime" showInlineError /></Col>
                  <Col><DateField name="EndTime" showInlineError /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="RecurringMeeting" showInlineError placeholder="" /></Col>
                  <Col><SelectField name="DesignatedAdvisor" showInlineError placeholder="N/A" /></Col>
                </Row>
                <Row>
                  <LongTextField name="Usage" showInlineError placeholder="" />
                </Row>
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} className="text-center" />
                <ErrorsField />
                <HiddenField name="createdAt" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;
