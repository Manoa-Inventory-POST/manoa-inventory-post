import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PortItem = ({ port }) => (
  <tr>
    <td>{`${port.port}`}</td>
    <td>{port.room}</td>
    <td>{port.side}</td>
    <td>{port.idf}</td>
    <td>{port.status}</td>
    <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editPort/${port._id}`}>Edit</Link>
  </tr>
);

// Require a document to be passed to this component.
PortItem.propTypes = {
  port: PropTypes.shape({
    port: PropTypes.string,
    _id: PropTypes.string,
    room: PropTypes.string,
    status: PropTypes.string,
    side: PropTypes.string,
    idf: PropTypes.string,
  }).isRequired,
};

export default PortItem;
