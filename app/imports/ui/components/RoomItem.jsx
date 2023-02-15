import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RoomItem = ({ room }) => (
  <tr>
    <td>{room.num}</td>
    <td>{room.description}</td>
  </tr>
);

// Require a document to be passed to this component.
RoomItem.propTypes = {
  room: PropTypes.shape({
    num: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default RoomItem;
