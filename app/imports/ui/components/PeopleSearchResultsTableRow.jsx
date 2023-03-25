import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PeopleSearchResultsTableRow = ({ user }) => (
  <tr>
    <td>{ user.firstName }</td>
    <td>{ user.lastName }</td>
    <td>{ user.room }</td>
    <td>{ user.phones }</td>
    <td>{ user.role }</td>
    <td>
      <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editUser/${user._id}`}>Edit</Link>
      <Link className="btn btn-danger btn-delete d-inline" to={`/editUser/${user._id}`}>Delete</Link>
    </td>
  </tr>
);

PeopleSearchResultsTableRow.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    room: PropTypes.string,
    _id: PropTypes.string,
    phones: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default PeopleSearchResultsTableRow;
