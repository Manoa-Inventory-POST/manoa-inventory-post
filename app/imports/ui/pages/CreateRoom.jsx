import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Room } from '../../api/room/RoomCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';

const statusValues = ['open', 'occupied', 'maintenance'];
const buildingValues = ['POST'];

const RoomSchema = new SimpleSchema({
  room: String,
  description: String,
  building: { type: String, allowedValues: buildingValues },
  status: { type: String, allowedValues: statusValues },
});

const bridge = new SimpleSchema2Bridge(RoomSchema);

const CreateRoom = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    const subscription = Room.subscribeRoom();
    const rdy = subscription.ready();
    return {
      ready: rdy,
    };
  });

  // On successful submit, insert the data.
  const submit = (data) => {
    const { room, description, building, status } = data;
    const collectionName = Room.getCollectionName();
    const definitionData = { room, description, building, status };
    console.log(definitionData);
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'User updated successfully', 'success'));
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Room</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="room" />
                <TextField name="description" />
                <SelectField name="building" />
                <SelectField name="status" />
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

export default CreateRoom;
