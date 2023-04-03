import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import StudentListTable from '../components/StudentListTable';

const StudentList = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const { studentList, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('students');
    const loading = !handle.ready();
    const studentList = StudentProfiles.find({}, { fields: { email: 1, firstName: 1, lastName: 1, TA: 1, RA: 1 } }).fetch();
    return { studentList, isLoading: loading };
  });

  const handleCheckboxChange = (event) => {
    const studentId = event.target.value;
    if (event.target.checked) {
      setSelectedStudents((prevSelected) => [...prevSelected, studentId]);
    } else {
      setSelectedStudents((prevSelected) => prevSelected.filter((id) => id !== studentId));
    }
  };

  const handleUpdateRoles = () => {
    // Call method to update roles for selected students.
    Meteor.call('students.updateRoles', selectedStudents);
    setSelectedStudents([]);
  };

  return (
    <>
      <h1 className="text-center">Student List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>TA</th>
              <th>RA</th>
              {Roles.userIsInRole(Meteor.userId(), 'faculty') && <th>Select</th>}
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr key={student._id}>
                <td>{student.email}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.TA ? 'Yes' : 'No'}</td>
                <td>{student.RA ? 'Yes' : 'No'}</td>
                {Roles.userIsInRole(Meteor.userId(), 'faculty') && (
                  <td>
                    <input type="checkbox" value={student._id} onChange={handleCheckboxChange} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          <StudentListTable />
        </Container>
      )}
      {Roles.userIsInRole(Meteor.userId(), 'FACULTY') && (
        <button type="button" disabled={selectedStudents.length === 0} onClick={handleUpdateRoles}>
          Update Roles
        </button>
      )}
    </>
  );
};

export default StudentList;
