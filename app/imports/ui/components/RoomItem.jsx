import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ROLE } from '../../api/role/Role';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const RoomItem = ({ room }) => (
  <tr>
    <td>{room.room}</td>
    <td>{room.description}</td>
  </tr>
);

// Require a document to be passed to this component.
RoomItem.propTypes = {
  room: PropTypes.shape({
    room: PropTypes.string,
    description: PropTypes.string,
    building: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomItem;
