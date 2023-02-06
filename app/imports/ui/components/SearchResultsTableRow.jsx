import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchResultsTableRow = ({ user }) => (
  <tr>
    <td>{ user.firstName }</td>
    <td>{ user.lastName }</td>
    <td>{ user.officeBuilding }</td>
    <td>{ user.officeRoomNumber }</td>
    <td>{ user.phoneNumber }</td>
    <td>{ user.role }</td>
    <td>
      <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editUser/${user._id}`}>Edit</Link>
      <Link className="btn btn-danger btn-delete d-inline" to={`/editUser/${user._id}`}>Delete</Link>
    </td>
  </tr>
);

SearchResultsTableRow.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    officeBuilding: PropTypes.string,
    officeRoomNumber: PropTypes.string,
    _id: PropTypes.string,
    phoneNumber: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default SearchResultsTableRow;
