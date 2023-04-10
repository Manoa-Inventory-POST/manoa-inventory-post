import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Ports } from '../../api/room/Ports';

const PortSearchResultsTableRow = ({ port }) => {

  const deletePort = () => {
    const collectionName = Ports.getCollectionName();
    console.log(collectionName);
    console.log(port);
    const portId = port._id;
    console.log(portId);
    removeItMethod.callPromise({ collectionName, instance: portId })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Port removed successfully', 'success');
      });
  };

  return (
    <tr>
      <td>{port.port}</td>
      <td>{port.room}</td>
      <td>{port.side}</td>
      <td>{port.status}</td>
      <td>{port.idf}</td>
      <td className="d-flex">
        <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editPort/${port._id}`}>Edit</Link>
        <Button className="btn btn-danger btn-delete d-inline" onClick={deletePort}>Delete</Button>
      </td>
    </tr>
  );
};

PortSearchResultsTableRow.propTypes = {
  port: PropTypes.shape({
    port: PropTypes.string,
    room: PropTypes.string,
    side: PropTypes.string,
    idf: PropTypes.string,
    status: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default PortSearchResultsTableRow;
