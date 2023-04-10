import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  SelectField,
  SubmitField,
  BoolField,
  TextField,
} from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { Room } from '../../api/room/RoomCollection';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { Interests } from '../../api/clubs/Interests';
import { OccupantRoom } from '../../api/room/OccupantRoom';
import { Phone } from '../../api/room/Phone';
import { UserInterests } from '../../api/clubs/UserInterests';
import { UserClubs } from '../../api/clubs/UserClubs';

const EditUser = () => {

  const { _id } = useParams();
  console.log(_id);

  const { roomNums, interestsColl, clubsNames, doc } = useTracker(() => {
    const subPhone = Phone.subscribePhone();
    const subClubs = Clubs.subscribeClubs();
    const subscription = Room.subscribeRoom();
    const subClubAdvisor = ClubAdvisor.subscribeClubAdvisor();
    const subInterests = Interests.subscribeInterests();
    const subUserInterests = UserInterests.subscribeUserInterests();
    const subUser = UserProfiles.subscribe();
    const subUserClubs = UserClubs.subscribeUserClubs();
    const subAdmin = AdminProfiles.subscribe();
    const subFaculty = FacultyProfiles.subscribeFaculty();
    const subStudent = StudentProfiles.subscribe();
    const subOffice = OfficeProfiles.subscribe();
    const subIT = ITSupportProfiles.subscribe();
    const subOccRoom = OccupantRoom.subscribeOccupantRoom();
    const rdy = subscription.ready() && subClubAdvisor.ready() && subInterests.ready() && subClubs.ready()
        && subUser.ready() && subAdmin.ready() && subFaculty.ready() && subStudent.ready() && subOffice.ready()
        && subIT.ready() && subOccRoom.ready() && subPhone.ready() && subUserInterests.ready() && subUserClubs.ready();
    const docUser = UserProfiles.find({ _id }, {}).fetch();
    const docAdmin = AdminProfiles.find({ _id }, {}).fetch();
    const docFaculty = FacultyProfiles.find({ _id }, {}).fetch();
    console.log(docFaculty);
    const docStudent = StudentProfiles.find({ _id }, {}).fetch();
    const docOffice = OfficeProfiles.find({ _id }, {}).fetch();
    const docIT = ITSupportProfiles.find({ _id }, {}).fetch();
    let userToEdit;

    if (docUser.length > 0) {
      userToEdit = docUser[0];
    } else if (docAdmin.length > 0) {
      userToEdit = docAdmin[0];
    } else if (docFaculty.length !== 0) {
      console.log('faculty switch');
      userToEdit = docFaculty[0];
      const email = userToEdit.email;
      let roomArr = OccupantRoom.find({ email: email }, {}).fetch();
      console.log(roomArr);
      const occRoomIdArr = roomArr.map(room => room._id);
      roomArr = roomArr.map(room => room.room);
      console.log(roomArr);
      roomArr = roomArr.map(room => room.split(' '));
      roomArr = roomArr.map(room => ((room.length > 1) ? room[1] : room[0]));
      userToEdit.rooms = roomArr;
      userToEdit.occupantRoomIds = occRoomIdArr;
      console.log(userToEdit.rooms);

      let phoneArr = Phone.find({ email: email }, {}).fetch();
      console.log(phoneArr);
      const phoneIdArr = phoneArr.map(item => item._id);
      phoneArr = phoneArr.map(item => item.phoneNum);
      console.log(phoneArr);
      if (phoneArr.length === 1) {
        phoneArr = phoneArr[0];
      } else {
        phoneArr = phoneArr.join(', ');
      }
      userToEdit.phones = phoneArr;
      userToEdit.phoneIds = phoneIdArr;
      console.log(userToEdit);

      const advisor = `${userToEdit.firstName} ${userToEdit.lastName}`;
      console.log(advisor);
      let clubArr = ClubAdvisor.find({ advisor: advisor }, {}).fetch();
      const clubAdvisorIds = clubArr.map(clubItem => clubItem._id);
      userToEdit.clubAdvisorIds = clubAdvisorIds;
      clubArr = clubArr.map(clubAdvisor => clubAdvisor.club);
      if (clubArr.length > 0) {
        userToEdit.clubAdvisor = true;
      }
      userToEdit.clubs = clubArr;

    } else if (docStudent.length > 0) {
      userToEdit = docStudent[0];
      const email = userToEdit.email;

      let interestsArr = UserInterests.find({ email: email }, {}).fetch();
      console.log(interestsArr);
      const interestsIdArr = interestsArr.map(item => item._id);
      interestsArr = interestsArr.map(item => item.interest);
      console.log(interestsArr);
      userToEdit.interests = interestsArr;
      userToEdit.interestIds = interestsIdArr;

      let clubsArr = UserClubs.find({ email: email }, {}).fetch();
      console.log(clubsArr);
      const clubsIdArr = clubsArr.map(item => item._id);
      console.log(clubsIdArr);
      clubsArr = clubsArr.map(item => item.club);
      console.log(clubsArr);
      userToEdit.clubs = clubsArr;
      userToEdit.clubIds = clubsIdArr;

    } else if (docOffice.length > 0) {
      userToEdit = docOffice[0];
    } else if (docIT.length > 0) {
      userToEdit = docIT[0];
    } else {
      console.log('user not found');
    }

    const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
    const interestEntries = Interests.find({}, {}).fetch();
    const clubEntries = Clubs.find({}, {}).fetch();
    console.log(roomEntries, interestEntries, clubEntries, rdy);

    return {
      roomNums: roomEntries,
      interestsColl: interestEntries,
      clubsNames: clubEntries,
      doc: userToEdit,
    };
  }, [_id]);

  const roomValues = [];
  for (let i = 0; i < roomNums.length; i++) {
    roomValues[i] = roomNums[i].room;
  }

  const clubNames = [];
  for (let i = 0; i < clubsNames.length; i++) {
    clubNames[i] = clubsNames[i].name;
  }

  const interestNames = [];
  for (let i = 0; i < interestsColl.length; i++) {
    interestNames[i] = interestsColl[i].interest;
  }

  const profileRoleValues = ['ADMIN', 'USER', 'STUDENT', 'FACULTY', 'OFFICE', 'ITSUPPORT'];

  const UserFormSchema = new SimpleSchema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    clubAdvisorIds: { type: Array, optional: true },
    'clubAdvisorIds.$': { type: String, optional: true },
    phoneIds: { type: Array, optional: true },
    'phoneIds.$': { type: String, optional: true },
    occupantRoomIds: { type: Array, optional: true },
    'occupantRoomIds.$': { type: String, optional: true },
    role: { type: String, allowedValues: profileRoleValues },
    rooms: { type: Array, label: 'Office(s)', optional: true },
    'rooms.$': { type: String, allowedValues: roomValues },
    phones: { type: String, label: 'Phone Numbers', optional: true },
    officeHours: { type: String, optional: true },
    picture: { type: String, optional: true },
    position: { type: String, optional: true },
    TA: { type: Boolean, label: 'TA', defaultValue: false },
    RA: { type: Boolean, label: 'RA', defaultValue: false },
    graduate: { type: Boolean, defaultValue: false },
    undergraduate: { type: Boolean, defaultValue: false },
    clubAdvisor: { type: Boolean, defaultValue: false },
    clubs: { type: Array, label: 'Clubs', optional: true },
    'clubs.$': { type: String, allowedValues: clubNames, optional: true },
    clubIds: { type: Array, optional: true },
    'clubIds.$': { type: String, optional: true },
    interests: { type: Array, label: 'Interests', optional: true },
    'interests.$': { type: String, allowedValues: interestNames, optional: true },
    interestIds: { type: Array, optional: true },
    'interestIds.$': { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(UserFormSchema);

  // On successful submit, insert the data.
  const submit = (data) => {
    console.log('submit');
    const { firstName, lastName, email, role, rooms, occupantRoomIds, phones, phoneIds, clubAdvisor, clubs, TA, RA, undergraduate, graduate, officeHours, position, picture, interests, clubAdvisorIds, clubIds, interestIds } = data;
    console.log(data);
    let phonesArray;
    let collectionName;
    let updateData = { id: _id, firstName, lastName };
    console.log(role);

    switch (role) {
    case 'STUDENT':
      console.log('STUDENT SWITCH');
      collectionName = StudentProfiles.getCollectionName();
      console.log(interests);
      updateData = { id: _id, firstName, lastName, email, TA, RA, graduate, undergraduate, clubs, clubIds, interests, interestIds };
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User updated successfully', 'success');
        });
      break;
    case 'ADMIN':
      console.log('ADMIN SWITCH');
      collectionName = AdminProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    case 'FACULTY':
      console.log('FACULTY SWITCH');
      phonesArray = phones ? phones.split(', ') : null;
      collectionName = FacultyProfiles.getCollectionName();
      updateData = { id: _id, email, firstName, lastName, officeHours, position, picture, rooms, occupantRoomIds, phones: phonesArray, phoneIds, clubs, clubIds, clubAdvisorIds, clubAdvisor };
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Faculty updated successfully', 'success');
        });
      break;
    case 'USER':
      console.log('USER SWITCH');
      collectionName = UserProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User updated successfully', 'success');
        });
      break;
    case 'OFFICE':
      console.log('OFFICE SWITCH');
      collectionName = OfficeProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User updated successfully', 'success');
        });
      break;
    case 'ITSUPPORT':
      console.log('ITSUPPORT SWITCH');
      collectionName = ITSupportProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User updated successfully', 'success');
        });
      break;
    default:
      break;
    }

  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col className="col-lg-10">
          <Col className="text-center"><h2>Edit User</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <div className="row">
                  <TextField className="col-md-6" name="firstName" placeholder="Your first name (required)" />
                  <TextField className="col-md-6" name="lastName" placeholder="Your last name (required)" />
                </div>
                <div className="row">
                  <TextField className="col-md-6" name="email" placeholder="Your email (required)" />
                  <SelectField className="col-md-6" name="role" placeholder="select role (required)" />
                </div>
                <div className="row">
                  <TextField className="col-md-6" name="phones" placeholder="Enter one or more phone numbers as digits only, separated by a comma, ex: 8081334137,9155452155" />
                  <TextField className="col-md-6" name="officeHours" placeholder="Your office hours" />
                </div>
                <div className="row">
                  <TextField className="col" name="picture" placeholder="picture url" />
                  <TextField className="col" name="position" placeholder="Your position" />
                </div>
                <div className="row">
                  <SelectField className="col-md-3" name="rooms" multiple inline />
                  <SelectField className="col-md-5" name="clubs" placeholder="Select any clubs you are the advisor for" multiple />
                  <SelectField className="col-md-4" name="interests" placeholder="Select your interests from the options provided" multiple readOnly />
                </div>
                <div className="my-3">
                  <BoolField className="d-md-inline" name="TA" inline />
                  <BoolField className="d-md-inline" name="RA" inline />
                  <BoolField className="d-md-inline" name="undergraduate" inline />
                  <BoolField className="d-md-inline" name="graduate" inline />
                  <BoolField className="d-md-inline" name="clubAdvisor" inline />
                </div>
                <HiddenField name="password" value="changeme" />
                <HiddenField name="clubAdvisorIds" />
                <HiddenField name="phoneIds" />
                <HiddenField name="occupantRoomIds" />
                <HiddenField name="clubIds" />
                <HiddenField name="interestIds" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
