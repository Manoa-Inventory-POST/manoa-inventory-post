import React from 'react';
import PropTypes from 'prop-types';
import StudentPositionItem from './StudentPositionItem';

const classStanding = (student) => {
  const results = [];
  if (student.undergraduate) {
    results.push('Undergraduate');
  } else {
    results.push('Graduate');
  }

  return results;
};

const SearchStudentItem = ({ student }) => (
  <tr>
    <td>{`${student.firstName} ${student.lastName}`}</td>
    <td>{student.email}</td>
    <td>{classStanding(student)}</td>
    <td>{StudentPositionItem(student)}</td>
  </tr>
);

// Require a document to be passed to this component.
SearchStudentItem.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    TA: PropTypes.bool,
    RA: PropTypes.bool,
    undergraduate: PropTypes.bool,
    graduate: PropTypes.bool,
    _id: PropTypes.string,
  }).isRequired,
};

export default SearchStudentItem;
