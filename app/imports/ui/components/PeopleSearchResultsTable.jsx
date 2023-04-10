import React, { useEffect, useState } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
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
import { Room } from '../../api/room/RoomCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';

const PeopleSearchResultsTable = () => {

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [userOfficeBuilding, setUserOfficeBuilding] = useState('');
  const [userRoom, setUserRoom] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userRole, setUserRole] = useState('');

  // eslint-disable-next-line no-unused-vars
  const { ready, users, admins, ITSupport, office, faculty, students } = useTracker(() => {

    const subscriptionUser = UserProfiles.subscribe();
    const subscriptionFaculty = FacultyProfiles.subscribeFaculty();
    const subscriptionOffice = OfficeProfiles.subscribe();
    const subscriptionAdmin = AdminProfiles.subscribe();
    const subscriptionIT = ITSupportProfiles.subscribe();
    const subscriptionStudent = StudentProfiles.subscribe();
    const subscriptionPhone = Phone.subscribePhone();
    // eslint-disable-next-line no-unused-vars
    const subscriptionOccRoom = OccupantRoom.subscribeOccupantRoom();

    const rdy = subscriptionUser.ready() && subscriptionFaculty.ready() && subscriptionOffice.ready() && subscriptionAdmin.ready() && subscriptionIT.ready() && subscriptionStudent.ready() && subscriptionPhone.ready();

    const userEntries = UserProfiles.find({}, { sort: { name: 1 } }).fetch();
    const adminEntries = AdminProfiles.find({}, { sort: { name: 1 } }).fetch();
    const officeEntries = OfficeProfiles.find({}, { sort: { name: 1 } }).fetch();
    const itEntries = ITSupportProfiles.find({}, { sort: { name: 1 } }).fetch();
    const facultyEntries = FacultyProfiles.find({}, { sort: { name: 1 } }).fetch();
    const studentEntries = StudentProfiles.find({}, { sort: { name: 1 } }).fetch();
    // eslint-disable-next-line no-unused-vars
    const phoneEntries = Phone.find({}, { sort: { name: 1 } }).fetch();

    // console.log(userEntries, adminEntries, officeEntries, facultyEntries, itEntries, studentEntries, phoneEntries, rdy);

    function buildPerson(user, RoomCollection, PhoneCollection) {
      const result = {};
      result.firstName = user.firstName;
      result.lastName = user.lastName;
      result.role = user.role;
      result._id = user._id;
      let roomArr = OccupantRoom.find({ email: user.email }).fetch();
      roomArr = roomArr.map(room => room.room);
      if (roomArr.length === 1) {
        roomArr = roomArr[0];
      } else {
        roomArr = roomArr.join(', ');
      }
      // console.log(roomArr);
      let phoneArr = PhoneCollection.find({ email: user.email }).fetch();
      phoneArr = phoneArr.map(item => item.phoneNum);
      if (phoneArr.length === 1) {
        phoneArr = phoneArr[0];
      } else {
        phoneArr = phoneArr.join(', ');
      }
      // console.log(phoneArr);
      result.room = roomArr;
      result.phones = phoneArr;
      return result;
    }
    const adminObjects = adminEntries.map(item => buildPerson(item, Room, Phone));
    const facultyObjects = facultyEntries.map(item => buildPerson(item, Room, Phone));
    const officeObjects = officeEntries.map(item => buildPerson(item, Room, Phone));
    const itObjects = itEntries.map(item => buildPerson(item, Room, Phone));
    const studentObjects = studentEntries.map(item => buildPerson(item, Room, Phone));
    const userObjects = userEntries.map(item => buildPerson(item, Room, Phone));
    // console.log(facultyObjects);

    Array.prototype.push.apply(userObjects, adminObjects);
    Array.prototype.push.apply(userObjects, facultyObjects);
    Array.prototype.push.apply(userObjects, officeObjects);
    Array.prototype.push.apply(userObjects, itObjects);
    Array.prototype.push.apply(userObjects, studentObjects);

    return {
      users: userObjects,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ready && users) {
      setFilteredUsers(users);
    }
  }, [ready, users]);

  useEffect(() => {
    let filtered = users;
    if (userFirstName) {
      filtered = filtered.filter(function (obj) { return obj.firstName.toLowerCase().includes(userFirstName.toLowerCase()); });
    }
    if (userLastName) {
      filtered = filtered.filter(function (obj) { return obj.lastName.toLowerCase().includes(userLastName.toLowerCase()); });
    }
    if (userRoom) {
      filtered = filtered.filter(function (obj) { return obj.room.toLowerCase().includes(userRoom.toLowerCase()); });
    }
    if (userPhone) {
      filtered = filtered.filter(function (obj) { return obj.phones.toLowerCase().includes(userPhone.toLowerCase()); });
    }
    if (userRole) {
      filtered = filtered.filter(function (obj) { return obj.role.toLowerCase().includes(userRole.toLowerCase()); });
    }
    setFilteredUsers(filtered);
  }, [userFirstName, userLastName, userOfficeBuilding, userRoom, userPhone, userRole]);

  return (ready ? (
    <Container className="">
      <Form className="">
        <div className="row mb-2">
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by first name">First Name</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="first name"
              onChange={e => setUserFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by last name">Last Name</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="last name"
              onChange={e => setUserLastName(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row mb-4">
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by room number">Office Room Number</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="room number"
              onChange={e => setUserRoom(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by room number">Phone Number</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="phone number"
              onChange={e => setUserPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by role">Role</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="role"
              onChange={e => setUserRole(e.target.value)}
            />
          </Form.Group>
        </div>
      </Form>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Room</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { filteredUsers.length === 0 ? (<tr><td>-</td></tr>) : filteredUsers.map((user) => <PeopleSearchResultsTableRow key={user._id} user={user} />)}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Users" />);
};
export default PeopleSearchResultsTable;
