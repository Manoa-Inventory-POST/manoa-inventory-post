import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const OfficeItem = ({ officeReq }) => (
  <tr>
    <td>{`${officeReq.name}`}</td>
    <td>{officeReq.condition}</td>
  </tr>
);

// Require a document to be passed to this component.
OfficeItem.propTypes = {
  officeReq: PropTypes.shape({
    name: PropTypes.string,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OfficeItem;
