import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const OfficeItem = ({ officeReq }) => (
  <tr>
    <td>{officeReq.email}</td>
    <td>{officeReq.firstName}</td>
    <td>{officeReq.lastName}</td>
    <td>{officeReq.description}</td>
    <td>{officeReq.condition}</td>
  </tr>
);

// Require a document to be passed to this component.
OfficeItem.propTypes = {
  officeReq: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OfficeItem;
