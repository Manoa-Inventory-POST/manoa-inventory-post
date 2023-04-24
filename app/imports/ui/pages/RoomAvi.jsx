import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
      <Col className="text-center">
        <h2>Post 3rd Floor</h2>
      </Col>
      <hr />
      <Row xs={1} md={2} lg={4} className="g-2">
        {rooms.map((room) => <RoomItem key={room._id} room={room} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Rooms" />);
};

export default RoomAvi;
