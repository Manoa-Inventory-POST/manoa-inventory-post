import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FacultyItem = ({ faculty }) => (
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
);

// Require a document to be passed to this component.
FacultyItem.propTypes = {
  faculty: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    office: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyItem;
