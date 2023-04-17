import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Room } from '../../api/room/RoomCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';

const AssignFac = () => {
  const { _id } = useParams();
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
  // const [occupant, setOccupant] = useState('');
  const [setOccupant] = useState('');

  const handleOccupantChange = (event) => {
    const { room, status } = event;
    const collectionName = Room.getCollectionName();
    const updateData = { id: _id, room, status };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'User updated successfully', 'success'));
  };

  return (ready ? (
    <div className="container">
      <h1 className="text-center">Room Occupancy</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Room</th>
            <th>Occupant</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.room}</td>
              <td>
                <Form.Select
                  aria-label={`Occupant for room ${room.room}`}
                  value={room.occupant}
                  onChange={handleOccupantChange}
                >
                  <option value="">Choose Occupant</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Bob Johnson">Bob Johnson</option>
                  <option value="Sarah Lee">Sarah Lee</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  ) : <LoadingSpinner message="Loading Rooms" />);
};

export default AssignFac;
