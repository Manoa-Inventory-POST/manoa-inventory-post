import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FacultyItem = ({ faculty }) => (
  /*
  <div className="card" style={{ width: '18rem' }}>
    <Image rounded width={100} src={faculty.image} />
    <div className="card-body">
      <h5 className="card-title">{faculty.firstname} {faculty.lastname}</h5>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">{faculty.role}</li>
      <li className="list-group-item">{faculty.office}</li>
      <li className="list-group-item">{faculty.phone}</li>
      <li className="list-group-item">{faculty.email}</li>
    </ul>
  </div>
   */
  <tr>
    <td><Image alt="" src={faculty.image} width="180" height="180" /></td>
    <td>{`${faculty.firstName} ${faculty.lastName}`}<br />{faculty.role}</td>
    <td>{faculty.email}<br />{faculty.phone}</td>
    <td>{faculty.office}</td>
  </tr>
);

// Require a document to be passed to this component.
FacultyItem.propTypes = {
  faculty: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    office: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyItem;
