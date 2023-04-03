import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';

const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);

const FacultyItem = ({ faculty }) => (
  <tr>
    <td><Image alt="" src={faculty.picture} width="180" height="180" /></td>
    <td><Link to={`/facultyinfo/${faculty._id}`}>{`${faculty.firstName} ${faculty.lastName}`}</Link></td>
    <td>{faculty.position}</td>
    <td>{faculty.email}<br />{faculty.phone}</td>
    <td>{faculty.officeHours}</td>
    {isAdmin || isOffice ? ([
      <td>{faculty.emergency}</td>,
    ]) : ''}
  </tr>
);

// Require a document to be passed to this component.
FacultyItem.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    picture: PropTypes.string,
    position: PropTypes.string,
    officeHours: PropTypes.string,
    emergency: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyItem;
