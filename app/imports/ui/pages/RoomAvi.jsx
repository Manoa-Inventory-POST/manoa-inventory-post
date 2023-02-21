import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Room } from '../../api/room/RoomCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import RoomItem from '../components/RoomItem';

/* Renders a table containing all of the Room documents. Use <RoomItem> to render each row. */
const RoomAvi = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, rooms } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Room documents.
    const subscription = Room.subscribeRoom();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Room documents
    const roomItems = Room.find({}).fetch();
    return {
      rooms: roomItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.Room_Avi} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Post 3rd Floor</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Room number</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => <RoomItem key={room._id} room={room} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Rooms" />);
};

export default RoomAvi;
