import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
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
// import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
// import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { ReservationForm } from '../../api/reserveform/ReservationCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const AddReservationForm = () => {

  const schema = new SimpleSchema({
    room: {
      type: String,
      allowedValues: ['319', '318A', '318B', '316', '315'],
      defaultValue: '319',
    },
    startTime: Date,
    endTime: Date,
    recurringMeeting: {
      type: String,
      allowedValues: ['one-time', 'daily', 'weekly', 'biweekly', 'monthly'],
      defaultValue: 'one-time',
    },
    attendance: Number,
    usage: String,
    designatedAdvisor: {
      type: String,
      allowedValues: ['N/A', 'Carleton Moore', 'Philip Johnson', 'Scott Robertson', 'Dan Suthers', 'Henri Casanova'],
      defaultValue: 'N/A',
    },
    applicantId: {
      type: String,
      defaultValue: Meteor.user().username, // need to update upon
    },
    createdAt: Date,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { room, startTime, endTime, attendance, usage, designatedAdvisor, recurringMeeting, createdAt } = data;
    const applicantId = Meteor.user().username;
    const collectionName = ReservationForm.getCollectionName();
    const definitionData = { room, startTime, endTime, recurringMeeting, attendance, usage, designatedAdvisor, applicantId, createdAt };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Reservation submitted successfully', 'success');
        formRef.reset();
      });
  };

  /* Display the reserve form. */
  let fRef = null;
  return (
    <Container className="py-3" id={PAGE_IDS.RESERVE_ROOM}>
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Reserve Now</h2>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><SelectField name="room" showInlineError /></Col>
                  <Col><TextField name="attendance" showInlineError placeholder="" /></Col>
                </Row>
                <Row>
                  <Col><DateField name="startTime" showInlineError /></Col>
                  <Col><DateField name="endTime" showInlineError /></Col>
                </Row>
                <Row>
                  <Col><SelectField name="recurringMeeting" showInlineError placeholder="" /></Col>
                  <Col><SelectField name="designatedAdvisor" showInlineError placeholder="N/A" /></Col>
                </Row>
                <Row>
                  <LongTextField name="usage" showInlineError placeholder="" />
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

export default AddReservationForm;
