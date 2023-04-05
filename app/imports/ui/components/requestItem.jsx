import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const OfficeItemF = ({ officeReqF }) => (
  <tr>
    <td>{officeReqF.email}</td>
    <td>{officeReqF.firstName}</td>
    <td>{officeReqF.lastName}</td>
    <td>{officeReqF.description}</td>
    <td>{officeReqF.condition}</td>
    <td>{officeReqF.requestTo}</td>
  </tr>
);

// Require a document to be passed to this component.
OfficeItemF.propTypes = {
  officeReq: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    condition: PropTypes.string,
    requestTo: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OfficeItemF;
