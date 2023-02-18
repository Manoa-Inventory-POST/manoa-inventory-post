import React, { useState } from 'react';
import { Mongo } from 'meteor/mongo';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  SelectField,
  SubmitField,
  TextField,
  AutoField,
  BoolField, LongTextField, ErrorField,
} from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import LoadingSpinner from '../components/LoadingSpinner';
import { Users } from '../../api/user/UserCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { Room } from '../../api/room/RoomCollection';
import { Clubs } from '../../api/clubs/Clubs';
import { AdvisorProfiles } from '../../api/user/AdvisorProfileCollection';
import { Phone } from '../../api/room/Phone';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';

const CreateUser = () => {

  const [error, setError] = useState('');
  const profileRoleValues = ['ADMIN', 'USER', 'STUDENT', 'FACULTY', 'OFFICE', 'ITSUPPORT', 'ADVISOR'];

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
    roomValues[i] = rooms[i].num;
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

  const phoneRegEx = new RegExp("\d{3}-\d{3}-\d{4}");

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
    let insertError;
    const { firstName, lastName, email, password, role, room, studentType, phone, clubAdvisor, club } = data;
    switch (data.role) {
    case 'ADMIN':
      AdminProfiles.define({ email, firstName, lastName, password });
      if (phone !== '') {
        Phone.define({ email, phone });
      }
      break;
    case 'FACULTY':
      FacultyProfiles.define({ email, firstName, lastName, password });
      Phone.define({ email, phone });
      if (clubAdvisor === 'true') {
        ClubAdvisor.define({ email, club });
      }
      break;
    case 'USER':
      UserProfiles.define({ email, firstName, lastName, password });
      break;
    case 'STUDENT':
      StudentProfiles.define({ email, firstName, lastName, password });
      break;
    case 'OFFICE':
      OfficeProfiles.define({ email, firstName, lastName, password });
      Phone.define({ email, phone });
      break;
    case 'ITSUPPORT':
      ITSupportProfiles.define({ email, firstName, lastName, password });
      Phone.define({ email, phone });
      break;
    case 'ADVISOR':
      AdvisorProfiles.define({ email, firstName, lastName, password });
      Phone.define({ email, phone });
      break;
    default:
      break;
    }
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create User</h2></Col>
          <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
            <Card>
              <Card.Body>
                <AutoField name="firstName" placeholder="Your first name (required)" />
                <AutoField name="lastName" placeholder="Your last name (required)" />
                <AutoField name="email" placeholder="Your email (required)" />
                <HiddenField name="password" value="changeme" />
                <SelectField name="role" placeholder="select role (required)" />
                <LongTextField name="phone" placeholder="Enter one or more phone numbers" />
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
