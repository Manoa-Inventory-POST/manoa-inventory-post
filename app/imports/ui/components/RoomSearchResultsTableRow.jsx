import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Room } from '../../api/room/RoomCollection';

const RoomSearchResultsTableRow = ({ room }) => {

  const deleteRoom = () => {
    const collectionName = Room.getCollectionName();
    console.log(collectionName);
    console.log(room);
    const roomId = room._id;
    console.log(roomId);
    removeItMethod.callPromise({ collectionName, instance: roomId })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Room removed successfully', 'success');
      });
  };

  return (
    <tr>
      <td>{room.building}</td>
      <td>{room.room}</td>
      <td>{room.description}</td>
      <td>{room.status}</td>
      <td className="d-flex">
        <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editRoom/${room._id}`}>Edit</Link>
        <Button className="btn btn-danger btn-delete d-inline" onClick={deleteRoom}>Delete</Button>
      </td>
    </tr>
  );
};

RoomSearchResultsTableRow.propTypes = {
  room: PropTypes.shape({
    building: PropTypes.string,
    room: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomSearchResultsTableRow;
