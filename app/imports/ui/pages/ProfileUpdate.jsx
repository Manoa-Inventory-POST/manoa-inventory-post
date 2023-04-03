import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { AutoForm, BoolField, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
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

const ProfileUpdate = () => {

  const _id = Meteor.user()._id;
  console.log(_id);
  const { ready, userProfile } = useTracker(() => {
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

    //const subscription = FacultyProfiles.subscribeFaculty();
    //const facultyProfiles = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
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
      let roomArr = OccupantRoom.find({ email: email }, {}).fetch();
      const occRoomIdArr = roomArr.map(obj => obj._id);
      console.log(occRoomIdArr);
      roomArr = roomArr.map(item => item.room);
      roomArr = roomArr.map(item => item.split(' '));
      roomArr = roomArr.map(item => ((item.length > 1) ? item[1] : item[0]));
      userProfile.office = roomArr;
      userProfile.occupantRoomIds = occRoomIdArr;
      console.log(userProfile.office);

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

    } else if (docStudent.length > 0) {
      userProfile = docStudent[0];
    } else if (docOffice.length > 0) {
      userProfile = docOffice[0];
    } else if (docIT.length > 0) {
      userProfile = docIT[0];
    } else {
      console.log('user not found');
    }

    return {
      userProfile: userProfile,
      ready: rdy,
    };
  }, []);
  //console.log(userProfile);
  //console.log('sss');

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
    role: { type: String },
    rooms: { type: Array, label: 'Office(s)', optional: true },
    'rooms.$': { type: String },
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
    'clubs.$': { type: String, optional: true },
    interests: { type: Array, label: 'Interests', optional: true },
    'interests.$': { type: String, optional: true },
  });
  const bridge = new SimpleSchema2Bridge(UserProfileSchema);
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col className="col-lg-10">
          <Col className="text-center"><h2>{ userProfile.firstName }&apos;s PROFILE</h2></Col>
          {/*
           <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
*/}
          <AutoForm schema={bridge}>
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
                  <SelectField className="col-md-6" name="role" placeholder="select role (required)" />
                  <TextField className="col-md-6" name="officeHours" placeholder="Your office hours" />
                </div>
                <div className="row">
                  <TextField className="col" name="picture" placeholder="picture url" />
                  <TextField className="col" name="position" placeholder="Your position" readOnly />
                </div>
                <div className="row">
                  <SelectField className="col-md-3" name="rooms" multiple inline />
                  <SelectField
                    className="col-md-5"
                    name="clubs"
                    placeholder="Select any clubs you are the advisor for"
                    multiple
                  />
                  <SelectField
                    className="col-md-4"
                    name="interests"
                    placeholder="Select your interests from the options provided"
                    multiple
                    readOnly
                  />
                </div>
                <div className="my-3">
                  <BoolField className="d-md-inline" name="TA" inline />
                  <BoolField className="d-md-inline" name="RA" inline />
                  <BoolField className="d-md-inline" name="undergraduate" inline />
                  <BoolField className="d-md-inline" name="graduate" inline />
                  <BoolField className="d-md-inline" name="clubAdvisor" inline />
                </div>
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
