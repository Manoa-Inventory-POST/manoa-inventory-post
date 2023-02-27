import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RoomSearchResultsTableRow = ({ room }) => (
  <tr>
    <td>{ room.building }</td>
    <td>{ room.num }</td>
    <td>{ room.description }</td>
    <td>{ room.status }</td>
    <td>
      <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editRoom/${room._id}`}>Edit</Link>
      <Link className="btn btn-danger btn-delete d-inline" to={`/deleteRoom/${room._id}`}>Delete</Link>
    </td>
  </tr>
);

RoomSearchResultsTableRow.propTypes = {
  room: PropTypes.shape({
    building: PropTypes.string,
    num: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomSearchResultsTableRow;
