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
  LongTextField,
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
import { Phone } from '../../api/room/Phone';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { OccupantRoom } from '../../api/room/OccupantRoom';

const CreateUser = () => {

  const { rooms } = useTracker(() => {
    const subscription = Room.subscribeRoom();
    const rdy = subscription.ready();
    const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
    console.log(roomEntries, rdy);

    return {
      rooms: roomEntries,
    };
  });

  const roomValues = [];
  for (let i = 0; i < rooms.length; i++) {
    roomValues[i] = rooms[i].room;
  }

  const { clubs } = useTracker(() => {
    // const subscription = Clubs.subscribeClubsAdmin();
    const subscription = Clubs.subscribeClubs();
    const rdy = subscription.ready();
    const clubEntries = Clubs.find({}, {}).fetch();
    console.log(clubEntries, rdy);
    return {
      clubs: clubEntries,
    };
  });

  const clubNames = [];
  for (let i = 0; i < clubs.length; i++) {
    clubNames[i] = clubs[i].name;
  }

  const profileRoleValues = ['ADMIN', 'USER', 'STUDENT', 'FACULTY', 'OFFICE', 'ITSUPPORT', 'ADVISOR'];

  const UserFormSchema = new SimpleSchema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: { type: String, allowedValues: profileRoleValues },
    room: { type: Array, label: 'Office(s)', optional: true },
    'room.$': { type: String, allowedValues: roomValues },
    phone: { type: Array, label: 'Phone Numbers', optional: true },
    'phone.$': String,
    TA: { type: Boolean, label: 'TA', defaultValue: false },
    RA: { type: Boolean, label: 'RA', defaultValue: false },
    graduate: { type: Boolean, defaultValue: false },
    undergraduate: { type: Boolean, defaultValue: false },
    clubAdvisor: { type: Boolean, defaultValue: false },
    club: { type: String, allowedValues: clubNames, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(UserFormSchema);

  // On successful submit, insert the data.
  const submit = (data) => {
    console.log('submit');
    const { firstName, lastName, email, password, role, room, phone, clubAdvisor, club } = data;
    console.log(data);
    // const phoneArray = phone.split(',');
    let collectionName;
    const definitionData = { firstName, lastName, password, email };

    switch (role) {
    case 'ADMIN':
      console.log('ADMIN SWITCH');
      collectionName = AdminProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User added successfully', 'success');
        });
      break;
    case 'FACULTY':
      console.log('FACULTY SWITCH');
      collectionName = FacultyProfiles.getCollectionName();
      console.log(collectionName);
      console.log(typeof collectionName);
      defineMethod.callPromise({ collectionName, definitionData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User added successfully', 'success');
        });
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
      console.log(collectionName);
      console.log(typeof collectionName);
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
        <Col xs={5}>
          <Col className="text-center"><h2>Create User</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="firstName" placeholder="Your first name (required)" />
                <TextField name="lastName" placeholder="Your last name (required)" />
                <TextField name="email" placeholder="Your email (required)" />
                <HiddenField name="password" value="changeme" />
                <SelectField name="role" placeholder="select role (required)" />
                <LongTextField name="phone" placeholder="Enter one or more phone numbers as digits only, separated by a comma, ex: 8081334137,9155452155" />
                <SelectField name="room" multiple inline />
                <BoolField name="TA" inline />
                <BoolField name="RA" inline />
                <BoolField name="undergraduate" inline />
                <BoolField name="graduate" inline />
                <BoolField name="clubAdvisor" inline />
                <SelectField name="club" placeholder="Select any clubs you are the advisor for" multiple />
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
