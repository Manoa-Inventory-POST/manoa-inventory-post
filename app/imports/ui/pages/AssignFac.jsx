import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import swal from 'sweetalert';
import LoadingSpinner from '../components/LoadingSpinner';
import { Room } from '../../api/room/RoomCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import FacultyItem from '../components/FacultyItem';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';

const AssignFac = () => {
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const { _id } = useParams();
  const { ready, rooms, faculty, occ } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Room documents.
    const roomSubscription = Room.subscribeRoom();
    const facultySub = FacultyProfiles.subscribeFaculty();
    const occSub = OccupantRoom.subscribeOccupantRoom();
    // Determine if the subscription is ready
    const rdy = roomSubscription.ready() && facultySub.ready() && occSub.ready();
    // Get the Room documents
    const roomItems = Room.find({}).fetch();
    const facItems = FacultyProfiles.find({}).fetch();
    const occItems = OccupantRoom.find({}).fetch();
    return {
      occ: occItems,
      faculty: facItems,
      rooms: roomItems,
      ready: rdy,
    };
  }, []);

  // set faculty in filteredFaculty when finished loading
  useEffect(() => {
    if (ready) {
      setFilteredFaculty(faculty);
    }
  }, [ready]);

  const handleOccupantChange = (event) => {
    const { room, status } = event;
    const collectionName = Room.getCollectionName();
    const updateData = { id: _id, room, status };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'User updated successfully', 'success'));
  };

  /* need to change to just names */
  const facNames = filteredFaculty.map((members) => <FacultyItem key={members._id} faculty={members} />);

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
                  <option value="">{facNames}</option>
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
