import React, {} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ErrorsField, SubmitField, TextField, AutoForm } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  email: String,
  firstName: String,
  lastName: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const ServiceRequest = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, request } = data;
    const owner = Meteor.user().username;
    const collectionName = OfficeRequests.getCollectionName();
    console.log(typeof collectionName);
    const definitionData = { name, request, owner };
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
            <TextField name="email" placeholder="request" />
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
