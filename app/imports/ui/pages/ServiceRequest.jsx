import React, {} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ErrorsField, SubmitField, TextField, AutoForm, SelectField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { imageOption, OfficeRequests, requestToConditions } from '../../api/user/OfficeRequestCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  title: String,
  firstName: String,
  lastName: String,
  description: String,
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
    const { title, firstName, lastName, description, requestTo, picture } = data;
    const owner = Meteor.user().username;
    const collectionName = OfficeRequests.getCollectionName();
    const definitionData = { owner, title, firstName, lastName, description, requestTo, picture };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <Container className="py-3">
      <Row>
        <Col className="text-center">
          <h2>Service Request</h2>
        </Col>
      </Row>
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
        <Row>
          <Col>
            <TextField name="firstName" placeholder="firstname" />
          </Col>
          <Col>
            <TextField name="lastName" placeholder="lastname" />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField name="title" placeholder="What is your request about?" />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField name="picture" placeholder="choose an option" />
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectField name="requestTo" placeholder="Office or It support" />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField name="description" placeholder="request" />
          </Col>
        </Row>
        <Row>
          <SubmitField value="Submit" />
          <ErrorsField />
        </Row>
      </AutoForm>
    </Container>
  );
};

export default ServiceRequest;
