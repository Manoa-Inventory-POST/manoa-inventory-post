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
import { Ports } from '../../api/room/Ports';

const statusValues = ['active', 'inactive', 'maintenance'];
const sideValues = ['N/A', 'Makai', 'DH', 'Ewa', 'Mauka Wall'];
const buildingValues = ['POST'];

const CreatePort = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    const subscription = Ports.subscribePorts();
    const subRooms = Room.subscribeRoom();
    const rdy = subscription.ready() && subRooms.ready();
    return {
      ready: rdy,
    };
  });

  let roomValues = Room.find({}, { sort: { num: 1 } }).fetch();
  roomValues = roomValues.map(room => room.room);

  const PortSchema = new SimpleSchema({
    port: String,
    building: { type: String, allowedValues: buildingValues },
    room: { type: String, allowedValues: roomValues },
    side: { type: String, allowedValues: sideValues },
    idf: { type: String, allowedValues: roomValues },
    status: { type: String, allowedValues: statusValues },
  });

  const bridge = new SimpleSchema2Bridge(PortSchema);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { port, building, room, side, idf, status } = data;
    const collectionName = Ports.getCollectionName();
    const definitionData = { port, building, room, side, idf, status };
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
                <TextField name="port" placeholder="enter port number" />
                <SelectField name="building" placeholder="select building" />
                <SelectField name="room" placeholder="select room number" />
                <SelectField name="side" placeholder="select side of room" />
                <SelectField name="idf" placeholder="select idf (other end of port)" />
                <SelectField name="status" placeholder="select status" />
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

export default CreatePort;
