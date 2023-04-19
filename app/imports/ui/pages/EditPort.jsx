import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Ports } from '../../api/room/Ports';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { Room } from '../../api/room/RoomCollection';
import { ROLE } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';

const EditPort = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Ports.subscribePorts();
    const subRooms = Room.subscribeRoom();
    const rdy = subscription.ready() && subRooms.ready();
    // Get the document
    const document = Ports.find({ _id }, {}).fetch();
    console.log(document);
    const portToEdit = document[0];
    console.log(portToEdit);
    return {
      doc: portToEdit,
      ready: rdy,
    };
  }, [_id]);

  const statusValues = ['active', 'inactive', 'maintenance'];
  const sideValues = ['N/A', 'Makai', 'DH', 'Ewa', 'Mauka Wall'];
  const buildingValues = ['POST'];
  let roomValues = Room.find({}, { sort: { num: 1 } }).fetch();
  console.log(roomValues);
  roomValues = roomValues.map(room => room.room);
  console.log(roomValues);

  const PortSchema = new SimpleSchema({
    port: String,
    building: { type: String, allowedValues: buildingValues },
    room: { type: String, allowedValues: roomValues },
    side: { type: String, allowedValues: sideValues },
    idf: { type: String, allowedValues: roomValues },
    status: { type: String, allowedValues: statusValues },
  });

  const bridge = new SimpleSchema2Bridge(PortSchema);

  const submit = (data) => {
    const { port, room, side, idf, status } = data;
    const collectionName = Ports.getCollectionName();
    const updateData = { id: _id, port, room, side, idf, status };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'User updated successfully', 'success'));
  };

  const isITSupport = Roles.userIsInRole(Meteor.userId(), [ROLE.ITSUPPORT]);
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);

  if (isITSupport || isOffice) {
    return (
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={5}>
            <Col className="text-center"><h2>Update Port</h2></Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
              <Card>
                <Card.Body>
                  <TextField disabled name="port" />
                  <SelectField disabled name="room" />
                  <SelectField disabled name="building" />
                  <SelectField disabled name="side" />
                  <SelectField disabled name="idf" />
                  <SelectField name="status" />
                  <SubmitField value="Submit" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    );
  }
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Update Port</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="port" />
                <SelectField name="room" />
                <SelectField name="building" />
                <SelectField name="side" />
                <SelectField name="idf" />
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

export default EditPort;
