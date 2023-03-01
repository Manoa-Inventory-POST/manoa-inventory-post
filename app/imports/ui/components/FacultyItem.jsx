import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FacultyItem = ({ faculty }) => (
  <tr>
    <td><Image alt="" src={faculty.picture} width="180" height="180" /></td>
    <td>{`${faculty.firstName} ${faculty.lastName}`}</td>
    <td>{faculty.role}</td>
    <td>{faculty.email}<br />{faculty.phone}</td>
    <td>{faculty.office}</td>
  </tr>
);

// Require a document to be passed to this component.
FacultyItem.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string,
    role: PropTypes.string,
    office: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyItem;
