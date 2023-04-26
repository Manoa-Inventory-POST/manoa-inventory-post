import React, {} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ErrorField, SubmitField, TextField, AutoField, SelectField, AutoForm, LongTextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { imageOption, OfficeRequests, requestToConditions } from '../../api/user/OfficeRequestCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  firstName: String,
  lastName: String,
  description: String,
  date: String,
  requestTo: {
    type: String,
    allowedValues: requestToConditions,
  },
  picture: {
    type: String,
    optional: true,
    allowedValues: imageOption,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const ServiceRequest = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, firstName, lastName, description, requestTo, picture, time } = data;
    const owner = Meteor.user().username;
    const collectionName = OfficeRequests.getCollectionName();
    const definitionData = { owner, title, firstName, lastName, description, requestTo, picture, time };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <Container className="py-3" id={PAGE_IDS.SERVICE_REQUEST}>
      <Row>
        <Col className="text-center">
          <h2>Service Request</h2>
        </Col>
        <hr />
      </Row>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <TextField name="title" placeholder="What is your request about?" />
        <AutoField name="firstName" />
        <ErrorField name="firstName">
          <span>You have to provide your last name!</span>
        </ErrorField>
        <AutoField name="lastName" />
        <ErrorField name="lastName">
          <span>You have to provide your last name!</span>
        </ErrorField>
        <AutoField name="date" showInlineError type="date" />
        <LongTextField name="description" placeholder="Time frame, room number, etc." />
        <SelectField name="picture" placeholder="Choose an option" />
        <SelectField name="requestTo" placeholder="Office or IT Support" />
        <SubmitField value="Submit" />
      </AutoForm>
    </Container>
  );
};

export default ServiceRequest;
