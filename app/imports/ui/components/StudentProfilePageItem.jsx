import React from 'react';
/*
import InfoBar from './InfoBar';
*/
/* import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'; */

/* const displayRole = (student) => {
  const results = [];
  if (student.undergraduate) { results.push('Undergraduate'); }
  if (student.graduate) { results.push('Graduate'); }
  if (student.ta) { results.push('TA'); }
  if (student.ra) { results.push('RA'); }

  return results;
}; */

/** Renders general Student information */
const StudentInfoItem = (/* { student } */) => (
  <div className="col-md-6">
    <div className="p-3 py-5">
      <div className="d-flex justify-content-between align-items-center experience">Student Info</div>
      <br />
      <div className="col-md-12">[student data]<input type="text" className="form-control" placeholder="more data" /></div>
      <br />
      <div className="col-md-12">[additional data]<input type="text" className="form-control" placeholder="additional details" /></div>
    </div>
  </div>
);

/** Require a document to be passed to this component. */
/* StudentInfoItem.propTypes = {
  student: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    ta: PropTypes.bool,
    ra: PropTypes.bool,
    undergraduate: PropTypes.bool,
    graduate: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
}; */

export default StudentInfoItem;
