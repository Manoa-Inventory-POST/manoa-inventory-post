import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const displayRole = (student) => {
  const results = [];
  if (student.undergraduate) { results.push('Undergraduate'); }
  if (student.graduate) { results.push('Graduate'); }
  if (student.ta) { results.push('TA'); }
  if (student.ra) { results.push('RA'); }

  return results;
};

/** Renders general Student information */
const FacultyInfoItem = ({ student }) => (
  <Col className="align-content-center text-center">
    <Row>
      <h2 id="student-name">{student.firstname} {student.lastname}</h2>
    </Row>
    <Row>
      <h3>Roles: {displayRole(student).map((role) => `[${role}]`)}</h3>
    </Row>
    <Row>
      <h4><Link to={`/edit-student-profile/${student._id}`} id="edit-student-profile-link">Edit</Link></h4>
    </Row>
  </Col>
);

/** Require a document to be passed to this component. */
FacultyInfoItem.propTypes = {
  student: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    ta: PropTypes.bool,
    ra: PropTypes.bool,
    undergraduate: PropTypes.bool,
    graduate: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export {
  FacultyInfoItem,
};
