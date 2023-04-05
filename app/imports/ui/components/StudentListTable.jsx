import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Form, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import LoadingSpinner from './LoadingSpinner';

const handleTAClick = async (studentId, students) => {
  const currentStudent = students.find(student => student._id === studentId);
  const newRole = !currentStudent.TA ? 'ta' : 'ta';

  try {
    await new Promise((resolve, reject) => {
      Meteor.call('students.setRole', studentId, newRole, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const handleRAClick = async (studentId, students) => {
  const currentStudent = students.find(student => student._id === studentId);
  const newRole = !currentStudent.RA ? 'ra' : 'ra';

  try {
    await new Promise((resolve, reject) => {
      Meteor.call('students.setRole', studentId, newRole, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  } catch (error) {
    console.error(error);
  }
};

const StudentListTable = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isTA, setIsTA] = useState(false);
  const [isRA, setIsRA] = useState(false);

  const { students, ready } = useTracker(() => {
    const subscription = StudentProfiles.subscribe();
    const rdy = subscription.ready();
    const studentEntries = StudentProfiles.find({}, { sort: { lastName: 1 } }).fetch();
    return {
      students: studentEntries,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setFilteredStudents(students);
    }
  }, [ready, students]);

  useEffect(() => {
    let filtered = students;
    if (studentFirstName) {
      filtered = filtered.filter(function (obj) { return obj.firstName.toLowerCase().includes(studentFirstName.toLowerCase()); });
    }
    if (studentLastName) {
      filtered = filtered.filter(function (obj) { return obj.lastName.toLowerCase().includes(studentLastName.toLowerCase()); });
    }
    if (studentEmail) {
      filtered = filtered.filter(function (obj) { return obj.email.toLowerCase().includes(studentEmail.toLowerCase()); });
    }
    if (isTA) {
      filtered = filtered.filter(function (obj) { return obj.TA; });
    }
    if (isRA) {
      filtered = filtered.filter(function (obj) { return obj.RA; });
    }
    setFilteredStudents(filtered);
  }, [studentFirstName, studentLastName, studentEmail, isTA, isRA]);

  return (ready ? (
    <Container className="">
      <Form className="">
        <Container fluid className="row mb-2">
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by first name">First Name</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="first name"
              onChange={e => setStudentFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by last name">Last Name</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="last name"
              onChange={e => setStudentLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by email">Email</Form.Label>
            <Form.Control
              type="email"
              className="shadow-sm"
              placeholder="email"
              onChange={e => setStudentEmail(e.target.value)}
            />
          </Form.Group>
        </Container>
        <Container fluid className="row mb-4">
          <Form.Group className="col-lg-6">
            <Form.Check
              type="checkbox"
              label="TA"
              className="shadow-sm"
              onChange={e => setIsTA(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="col-lg-6">
            <Form.Check
              type="checkbox"
              label="RA"
              className="shadow-sm"
              onChange={e => setIsRA(e.target.checked)}
            />
          </Form.Group>
        </Container>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>TA</th>
            <th>RA</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student._id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={student.TA}
                  onChange={() => handleTAClick(student._id, students)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={student.RA}
                  onChange={() => handleRAClick(student._id, students)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  ) : (
    <LoadingSpinner />
  ));
};

export default StudentListTable;
