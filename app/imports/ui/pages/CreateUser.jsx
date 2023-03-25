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
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { Interests } from '../../api/clubs/Interests';
import { OccupantRoom } from '../../api/room/OccupantRoom';

const CreateUser = () => {

  const { roomNums, interestsColl, clubsNames } = useTracker(() => {
    const subClubs = Clubs.subscribeClubs();
    const subscription = Room.subscribeRoom();
    const subClubAdvisor = ClubAdvisor.subscribeClubAdvisor();
    const subInterests = Interests.subscribeInterests();
    const rdy = subscription.ready() && subClubAdvisor.ready() && subInterests.ready() && subClubs.ready();
    const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
    const interestEntries = Interests.find({}, {}).fetch();
    const clubEntries = Clubs.find({}, {}).fetch();
    console.log(roomEntries, interestEntries, clubEntries, rdy);

    return {
      roomNums: roomEntries,
      interestsColl: interestEntries,
      clubsNames: clubEntries,
    };
  });

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
    role: { type: String, allowedValues: profileRoleValues },
    rooms: { type: Array, label: 'Office(s)', optional: true },
    'rooms.$': { type: String, allowedValues: roomValues },
    phoneNums: { type: String, label: 'Phone Numbers', optional: true },
    officeHours: { type: String, optional: true },
    picture: { type: String, optional: true },
    position: { type: String, optional: true },
    TA: { type: Boolean, label: 'TA', defaultValue: false },
    RA: { type: Boolean, label: 'RA', defaultValue: false },
    graduate: { type: Boolean, defaultValue: false },
    undergraduate: { type: Boolean, defaultValue: false },
    clubAdvisor: { type: Boolean, defaultValue: false },
    clubs: { type: Array, label: 'Clubs' },
    'clubs.$': { type: String, allowedValues: clubNames, optional: true },
    interests: { type: Array, label: 'Interests' },
    'interests.$': { type: String, allowedValues: interestNames, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(UserFormSchema);

  // On successful submit, insert the data.
  const submit = (data) => {
    console.log('submit');
    const { firstName, lastName, email, password, role, rooms, phoneNums, clubAdvisor, clubs, TA, RA, undergraduate, graduate, officeHours, position, picture, interests } = data;
    const phones = phoneNums.split(',');
    console.log(typeof phones);
    console.log(data);
    let collectionName;
    let definitionData = { firstName, lastName, password, email };

    switch (role) {
    case 'ADMIN':
      console.log('ADMIN SWITCH');
      collectionName = AdminProfiles.getCollectionName();
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin added successfully', 'success');
        });
      break;
    case 'FACULTY':
      console.log('FACULTY SWITCH');
      collectionName = FacultyProfiles.getCollectionName();
      definitionData = { email, firstName, lastName, officeHours, position, picture, password, rooms, phones };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Faculty added successfully', 'success');
        });
      if (clubAdvisor) {
        collectionName = ClubAdvisor.getCollectionName();
        const advisor = email;
        for (let i = 0; i < clubs.length; i++) {
          const club = clubs[i];
          definitionData = { advisor, club };
          defineMethod.callPromise({ collectionName, definitionData })
            .catch(error => swal('Error', error.message, 'error'))
            .then(() => {
              swal('Success', 'User added successfully', 'success');
            });
        }
      }
      if (rooms) {
        console.log('rooms true');
        collectionName = OccupantRoom.getCollectionName();
        console.log(collectionName);
        for (let i = 0; i < rooms.length; i++) {
          const room = rooms[i];
          definitionData = { email, room };
          console.log(definitionData);
          defineMethod.callPromise({ collectionName, definitionData })
            .catch(error => swal('Error', error.message, 'error'))
            .then(() => {
              swal('Success', 'User added successfully', 'success');
            });
        }
      }
      break;
    case 'USER':
      console.log('USER SWITCH');
      collectionName = UserProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User added successfully', 'success');
        });
      break;
    case 'STUDENT':
      console.log('STUDENT SWITCH');
      collectionName = StudentProfiles.getCollectionName();
      console.log(interests);
      definitionData = { email, firstName, lastName, TA, RA, graduate, undergraduate, password, clubs, interests };
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User added successfully', 'success');
        });
      break;
    case 'OFFICE':
      console.log('OFFICE SWITCH');
      collectionName = OfficeProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User added successfully', 'success');
        });
      break;
    case 'ITSUPPORT':
      console.log('ITSUPPORT SWITCH');
      collectionName = ITSupportProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User added successfully', 'success');
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
          <Col className="text-center"><h2>Create User</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
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
                  <TextField className="col-md-6" name="phoneNums" placeholder="Enter one or more phone numbers as digits only, separated by a comma, ex: 8081334137,9155452155" />
                  <TextField className="col-md-6" name="officeHours" placeholder="Your office hours" />
                </div>
                <div className="row">
                  <TextField className="col" name="picture" placeholder="picture url" />
                  <TextField className="col" name="position" placeholder="Your position" />
                </div>
                <div className="row">
                  <SelectField className="col-md-3" name="rooms" multiple inline />
                  <SelectField className="col-md-5" name="clubs" placeholder="Select any clubs you are the advisor for" multiple />
                  <SelectField className="col-md-4" name="interests" placeholder="Select your interests from the options provided" multiple />
                </div>
                <div className="my-3">
                  <BoolField className="d-md-inline" name="TA" inline />
                  <BoolField className="d-md-inline" name="RA" inline />
                  <BoolField className="d-md-inline" name="undergraduate" inline />
                  <BoolField className="d-md-inline" name="graduate" inline />
                  <BoolField className="d-md-inline" name="clubAdvisor" inline />
                </div>
                <HiddenField name="password" value="changeme" />
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

export default CreateUser;
