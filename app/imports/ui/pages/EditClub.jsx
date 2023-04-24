import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Clubs } from '../../api/clubs/Clubs';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';

const ClubSchema = new SimpleSchema({
  name: String,
  website: String,
  description: String,
  picture: String,
  interests: String,
});

const bridge = new SimpleSchema2Bridge(ClubSchema);

/* Renders the EditStuff page for editing a single document. */
const EditClub = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Clubs.subscribeClubs();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Clubs.find({ _id }).fetch();
    const clubToEdit = document[0];
    return {
      doc: clubToEdit,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, website, description, picture, interests } = data;
    const collectionName = Clubs.getCollectionName();
    const updateData = { id: _id, name, website, description, picture, interests };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Club updated successfully', 'success'));
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Club</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField readOnly name="name" />
                <TextField name="website" />
                <TextField name="picture" />
                <TextField name="interests" />
                <LongTextField name="description" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading" />);
};

export default EditClub;
