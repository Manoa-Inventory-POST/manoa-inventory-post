import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { AutoForm, BoolField, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Phone } from '../../api/room/Phone';
import { Clubs } from '../../api/clubs/Clubs';
import { Room } from '../../api/room/RoomCollection';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { Interests } from '../../api/clubs/Interests';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';
import { updateMethod } from '../../api/base/BaseCollection.methods';

const ProfileUpdate = () => {

  const _id = Meteor.user()._id;
  console.log(_id);
  const { ready, userProfile, roomValues, interestNames, clubNames } = useTracker(() => {
    const subPhone = Phone.subscribePhone();
    const subClubs = Clubs.subscribeClubs();
    const subscriptionRooms = Room.subscribeRoom();
    const subClubAdvisor = ClubAdvisor.subscribeClubAdvisor();
    const subInterests = Interests.subscribeInterests();
    const subUser = UserProfiles.subscribe();
    const subAdmin = AdminProfiles.subscribe();
    const subFaculty = FacultyProfiles.subscribeFaculty();
    const subStudent = StudentProfiles.subscribe();
    const subOffice = OfficeProfiles.subscribe();
    const subIT = ITSupportProfiles.subscribe();
    const subOccRoom = OccupantRoom.subscribeOccupantRoom();
    const rdy = subscriptionRooms.ready() && subClubAdvisor.ready() && subInterests.ready() && subClubs.ready()
        && subUser.ready() && subAdmin.ready() && subFaculty.ready() && subStudent.ready() && subOffice.ready()
        && subIT.ready() && subOccRoom.ready() && subPhone.ready();

    // const subscription = FacultyProfiles.subscribeFaculty();
    // const facultyProfiles = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docUser = UserProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docAdmin = AdminProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docFaculty = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    console.log(docFaculty);
    const docStudent = StudentProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docOffice = OfficeProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docIT = ITSupportProfiles.find({ userID: Meteor.user()._id }, {}).fetch();

    let userProfile;

    if (docUser.length > 0) {
      userProfile = docUser[0];
    } else if (docAdmin.length > 0) {
      userProfile = docAdmin[0];
    } else if (docFaculty.length !== 0) {
      userProfile = docFaculty[0];
      console.log('faculty switch');
      const email = userProfile.email;
      // attach office
      let roomArr = OccupantRoom.find({ email: email }, {}).fetch();
      const occRoomIdArr = roomArr.map(obj => obj._id);
      console.log(occRoomIdArr);
      roomArr = roomArr.map(item => item.room);
      roomArr = roomArr.map(item => item.split(' '));
      roomArr = roomArr.map(item => ((item.length > 1) ? item[1] : item[0]));
      roomArr = roomArr[0];

      userProfile.office = roomArr;
      userProfile.occupantRoomIds = occRoomIdArr;
      console.log(userProfile.office);
      // attach phone
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
      userProfile.phones = phoneArr;
      userProfile.phoneIds = phoneIdArr;
      console.log(userProfile);
      // attach mentor
      const advisor = `${userProfile.firstName} ${userProfile.lastName}`;
      console.log(advisor);
      let clubArr = ClubAdvisor.find({ advisor: advisor }, {}).fetch();
      const clubAdvisorIds = clubArr.map(Item => Item._id);
      userProfile.clubAdvisorIds = clubAdvisorIds;
      console.log(clubArr);
      clubArr = clubArr.map(item => item.club);

      console.log(clubArr);
      if (clubArr.length > 0) {
        userProfile.clubAdvisor = true;
      } else {
        userProfile.clubAdvisor = false;
      }
      userProfile.clubs = clubArr;
      console.log(userProfile.clubs);

      console.log(userProfile);

    } else if (docStudent.length > 0) {
      userProfile = docStudent[0];
    } else if (docOffice.length > 0) {
      userProfile = docOffice[0];
    } else if (docIT.length > 0) {
      userProfile = docIT[0];
    } else {
      console.log('user not found');
    }

    const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
    const interestEntries = Interests.find({}, {}).fetch();
    const clubEntries = Clubs.find({}, {}).fetch();

    return {
      userProfile: userProfile,
      roomValues: roomEntries.map(Item => Item.room),
      interestNames: interestEntries.map(Item => Item.interest),
      clubNames: clubEntries.map(Item => Item.name),
      ready: rdy,
    };
  }, []);
  console.log(roomValues, interestNames, clubNames, ready);
  const UserProfileSchema = new SimpleSchema({
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
    role: { type: String, optional: true },
    office: { type: String, label: 'Office(s)', optional: true },
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
    interests: { type: Array, label: 'Interests', optional: true, defaultValue: undefined },
    'interests.$': { type: String, allowedValues: interestNames, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(UserProfileSchema);

  const submit = (data) => {
    const { email, phones, phoneIds, interests, officeHours, role } = data;
    const phonesArray = phones.split(', ');
    let collectionName;
    let updateData;

    switch (role) {
    case 'ADMIN':
      updateData = { email, phones: phonesArray };
      collectionName = AdminProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;

    case 'FACULTY':
      updateData = { email, officeHours };
      console.log(updateData);
      collectionName = FacultyProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    case 'USER':
      updateData = { email, phones: phonesArray };
      collectionName = UserProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    case 'STUDENT':
      updateData = { email, phones: phonesArray };
      collectionName = StudentProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    case 'OFFICE':
      updateData = { email, phones: phonesArray };
      collectionName = OfficeProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    case 'ITSUPPORT':
      updateData = { email, phones: phonesArray };
      collectionName = ITSupportProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    }
  };
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col className="col-lg-10">
          <Col className="text-center"><h2>{ userProfile.firstName }&apos;s Profile</h2></Col>
          {/*
           <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
*/}
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={userProfile}>
            <Card>
              <Card.Body>
                <div className="row">
                  <TextField
                    className="col-md-6"
                    name="firstName"
                    placeholder="Your first name (required)"
                    readOnly
                  />
                  <TextField
                    className="col-md-6"
                    name="lastName"
                    placeholder="Your last name (required)"
                    readOnly
                  />
                </div>
                <div className="row">
                  <TextField className="col-md-6" name="email" placeholder="Your email (required)" />
                  <TextField
                    className="col-md-6"
                    name="phones"
                    placeholder="Enter one or more phone numbers as digits only, separated by a comma, ex: 8081334137,9155452155"
                  />
                </div>
                <div className="row">
                  <TextField className="col-md-6" name="office" placeholder="Your office rooms" readOnly />
                  <TextField className="col-md-6" name="officeHours" placeholder="Your office hours" />
                </div>
                <div className="row">
                  <TextField className="col-md-6" name="role" placeholder="select role (required)" readOnly/>
                  <TextField className="col" name="position" placeholder="Your position" readOnly />
                </div>

                <div className="row">
                  <SelectField
                    className="col-md-6"
                    name="clubs"
                    placeholder="Select any clubs you are the advisor for"
                    multiple
                  />
                  <SelectField
                    className="col-md-6"
                    name="interests"
                    placeholder="Select your interests from the options provided"
                    multiple
                  />
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
                <SubmitField value="Save" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );

};
export default ProfileUpdate;
