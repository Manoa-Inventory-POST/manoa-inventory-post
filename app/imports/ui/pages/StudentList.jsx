import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Button, Container, Table } from 'react-bootstrap';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  const users = useTracker(() => {
    Meteor.subscribe('students');
    return Meteor.users.find({}).fetch();
  });

  useEffect(() => {
    const studentsList = users.filter(user => Roles.userIsInRole(user, 'student'));
    setStudents(studentsList);
  }, [users]);

  const setRole = (userId, role) => {
    Meteor.call('users.setRole', userId, role);
  };

  return (
    <Container>
      <h1>Student List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.username}</td>
              <td>{student.emails[0].address}</td>
              <td>
                <Button onClick={() => setRole(student._id, 'ta')}>Set as TA</Button>
                <Button onClick={() => setRole(student._id, 'ra')}>Set as RA</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default StudentList;
