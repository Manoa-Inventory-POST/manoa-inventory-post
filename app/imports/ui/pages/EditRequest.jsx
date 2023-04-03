import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(OfficeRequests._schema);

/* Renders the EditStuff page for editing a single document. */
const EditRequest = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = OfficeRequests.subscribeOffice();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = OfficeRequests.find({ _id }).fetch();
    const requestEdit = document[0];
    return {
      doc: requestEdit,
      ready: rdy,
    };
  }, [_id]);
  const [redirect, setRedirect] = useState(false);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { email, firstName, lastName, description, condition } = data;
    const collectionName = OfficeRequests.getCollectionName();
    const updateData = { id: _id, email, firstName, lastName, description, condition };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
    setRedirect(true);
  };

  if (redirect) {
    return (<Navigate to="/officeRequestHome" />);
  }

  return ready ? (
    <Container id={PAGE_IDS.EDIT_REQUEST} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit </h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="firstName" />
                <TextField name="lastName" />
                <TextField name="email" />
                <TextField name="description" />
                <SelectField name="condition" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditRequest;
