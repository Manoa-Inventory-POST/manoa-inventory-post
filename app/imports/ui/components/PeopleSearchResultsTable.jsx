import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';
import PeopleSearchResultsTableRow from './PeopleSearchResultsTableRow';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { Phone } from '../../api/room/Phone';

const PeopleSearchResultsTable = () => {
  const { ready, users, admins, ITSupport, office, faculty, students } = useTracker(() => {
    const subscription = UserProfiles.subscribe();
    FacultyProfiles.subscribe();
    OfficeProfiles.subscribe();
    AdminProfiles.subscribe();
    ITSupportProfiles.subscribe();
    StudentProfiles.subscribe();
    Phone.subscribePhone();
    const rdy = subscription.ready();
    const userEntries = UserProfiles.find({}, { sort: { name: 1 } }).fetch();
    const adminEntries = AdminProfiles.find({}, { sort: { name: 1 } }).fetch();
    const officeEntries = OfficeProfiles.find({}, { sort: { name: 1 } }).fetch();
    const itEntries = ITSupportProfiles.find({}, { sort: { name: 1 } }).fetch();
    const facultyEntries = FacultyProfiles.find({}, { sort: { name: 1 } }).fetch();
    const studentEntries = StudentProfiles.find({}, { sort: { name: 1 } }).fetch();
    const phoneEntries = Phone.find({}, { sort: { name: 1 } }).fetch();
    console.log(userEntries, rdy);
    console.log(adminEntries);
    console.log(officeEntries);
    console.log(facultyEntries);
    console.log(itEntries);
    console.log(studentEntries);
    console.log(phoneEntries);
    return {
      admins: adminEntries,
      users: userEntries,
      ITSupport: itEntries,
      office: officeEntries,
      faculty: facultyEntries,
      students: studentEntries,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3 search-results">
      <h2 className="ms-5 my-3">Search Results</h2>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Office Building</th>
            <th>Room</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <PeopleSearchResultsTableRow key={user.email} user={user} />)}
          {admins.map((admin) => <PeopleSearchResultsTableRow key={admin.email} user={admin} />)}
          {ITSupport.map((it) => <PeopleSearchResultsTableRow key={it.email} user={it} />)}
          {office.map((officePerson) => <PeopleSearchResultsTableRow key={officePerson.email} user={officePerson} />)}
          {faculty.map((facultyPerson) => <PeopleSearchResultsTableRow key={facultyPerson.email} user={facultyPerson} />)}
          {students.map((student) => <PeopleSearchResultsTableRow key={student.email} user={student} />)}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Users" />);
};
export default PeopleSearchResultsTable;
