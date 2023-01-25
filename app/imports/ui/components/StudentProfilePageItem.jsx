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
  <div className="col-md-4">
    <div className="p-3 py-5">
      <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus" />&nbsp;Experience</span></div>
      <br />
      <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value="" /></div>
      <br />
      <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value="" /></div>
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
