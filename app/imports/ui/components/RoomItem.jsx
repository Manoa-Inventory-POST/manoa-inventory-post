import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RoomItem = ({ room }) => (
  <Col>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="images/classroom.png" />
      <Card.Body>
        <Card.Title>{room.room}</Card.Title>
        <Card.Text>
          {room.description}
        </Card.Text>
      </Card.Body>
      <Card.Footer style={{ textAlign: 'center' }}>
        {room.status}
      </Card.Footer>
    </Card>
  </Col>
);
// Require a document to be passed to this component.
RoomItem.propTypes = {
  room: PropTypes.shape({
    room: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomItem;
