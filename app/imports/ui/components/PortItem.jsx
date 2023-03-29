import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PortItem = ({ port }) => (
  <tr>
    <td>{`${port.name}`}</td>
    <td>{port.room}</td>
    <td>{port.status}</td>
  </tr>
);

// Require a document to be passed to this component.
PortItem.propTypes = {
  port: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    room: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default PortItem;