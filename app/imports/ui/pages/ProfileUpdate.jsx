import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
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

  // const _id = Meteor.user()._id;
  // console.log('Meteor.user()._id');
  // console.log(_id);

  const { ready, roomValues, userToUpdate, interestNames, clubNames } = useTracker(() => {
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

    console.log('rdy');
    console.log(subscriptionRooms.ready());
    console.log(subOccRoom.ready());
    console.log(subClubs.ready());
    console.log(subFaculty.ready());
    console.log(subFaculty.ready());

    const docUser = UserProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docAdmin = AdminProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docFaculty = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    console.log(docFaculty);
    const docStudent = StudentProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docOffice = OfficeProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    console.log('docOffice:');
    console.log(docOffice);
    const docIT = ITSupportProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    let userProfile;

    const addAdvisor = () => {
      // attach advisor
      const advisor = `${userProfile.firstName} ${userProfile.lastName}`;
      // console.log(advisor);
      let clubArr = ClubAdvisor.find({ advisor: advisor }, {}).fetch();
      const clubAdvisorIds = clubArr.map(Item => Item._id);
      userProfile.clubAdvisorIds = clubAdvisorIds;
      // console.log(clubArr);
      clubArr = clubArr.map(item => item.club);
      // console.log(clubArr);
      if (clubArr.length > 0) {
        userProfile.clubAdvisor = true;
      } else {
        userProfile.clubAdvisor = false;
      }
    };
    const addPhone = () => {
      // attach phone
      let phoneArr = Phone.find({ email: userProfile.email }, {}).fetch();
      const phoneIdArr = phoneArr.map(item => item._id);
      phoneArr = phoneArr.map(item => item.phoneNum);
      if (phoneArr.length === 1) {
        phoneArr = phoneArr[0];
      } else {
        phoneArr = phoneArr.join(', ');
      }
      userProfile.phones = phoneArr;
      userProfile.phoneIds = phoneIdArr;
    };
    const addOffice = () => {
      // add office
      let roomArr = OccupantRoom.find({ email: userProfile.email }, {}).fetch();
      const occRoomIdArr = roomArr.map(obj => obj._id);
      // console.log(occRoomIdArr);
      roomArr = roomArr.map(item => item.room);
      roomArr = roomArr.map(item => item.split(' '));
      roomArr = roomArr.map(item => ((item.length > 1) ? item[1] : item[0]));
      roomArr = roomArr[0];
      userProfile.office = roomArr;
      userProfile.occupantRoomIds = occRoomIdArr;
      // console.log(userProfile.office);
    };

    if (docUser.length > 0) {
      userProfile = docUser[0];
      addPhone(userProfile);
    } else if (docAdmin.length > 0) {
      userProfile = docAdmin[0];
      addPhone(userProfile);
    } else if (docFaculty.length !== 0) {
      userProfile = docFaculty[0];
      console.log('facultyProfile:');
      console.log(userProfile);
      addOffice();
      addPhone();
      addAdvisor();
    } else if (docStudent.length > 0) {
      userProfile = docStudent[0];
      addPhone();
      console.log('studentProfile:');
      console.log(userProfile);
    } else if (docOffice.length > 0) {
      userProfile = docOffice[0];
      console.log('officeProfile:');
      console.log(userProfile);
      addPhone();
    } else if (docIT.length > 0) {
      userProfile = docIT[0];
      addPhone();
    } else {
      console.log('user not found');
    }

    const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
    const interestEntries = Interests.find({}, {}).fetch();
    const clubEntries = Clubs.find({}, {}).fetch();

    return {
      userToUpdate: userProfile,
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
    office: { type: String, label: 'Office(s)', defaultValue: 'N/A', optional: true },
    phones: { type: String, label: 'Phone Numbers', defaultValue: 'N/A', optional: true },
    officeHours: { type: String, defaultValue: 'N/A', optional: true },
    picture: { type: String, optional: true },
    position: { type: String, defaultValue: 'N/A', optional: true },
    TA: { type: Boolean, label: 'TA', defaultValue: false },
    RA: { type: Boolean, label: 'RA', defaultValue: false },
    graduate: { type: Boolean, defaultValue: false },
    undergraduate: { type: Boolean, defaultValue: false },
    clubAdvisor: { type: Boolean, defaultValue: false },
    clubs: { type: Array, label: 'Clubs', optional: true },
    'clubs.$': { type: String, allowedValues: clubNames, optional: true },
    interests: { type: Array, label: 'Interests', optional: true },
    'interests.$': { type: String, allowedValues: interestNames, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(UserProfileSchema);

  const submit = (data) => {
    console.log('data:');
    console.log(data);

    const { _id, email, firstName, lastName, phones, officeHours, role, phoneIds, clubAdvisorIds } = data;
    // const { _id, email, role, rooms, occupantRoomIds, phones, phoneIds, clubAdvisor, clubs, TA, RA, undergraduate, graduate, officeHours, position, picture, interests, clubAdvisorIds } = data;

    const phonesArray = phones.split(', ');
    let collectionName;
    let updateData;

    switch (role) {
    case 'ADMIN':
      updateData = { id: _id, email, phones: phonesArray, phoneIds };
      collectionName = AdminProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Admin updated successfully', 'success');
        });
      break;
    case 'FACULTY':
      updateData = { id: _id, email, officeHours, phones: phonesArray, phoneIds, clubAdvisorIds };
      console.log('updateData:');
      console.log(updateData);
      collectionName = FacultyProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Faculty updated successfully', 'success');
        });
      break;
    case 'USER':
      updateData = { id: _id, email, phones: phonesArray, phoneIds };
      collectionName = UserProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'User updated successfully', 'success');
        });
      break;
    case 'STUDENT':
      updateData = { id: _id, email, phones: phonesArray, phoneIds };
      collectionName = StudentProfiles.getCollectionName();
      console.log('updateData:');
      console.log(updateData);
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'Student updated successfully', 'success');
        });
      break;
    case 'OFFICE':
      updateData = { id: _id, email, phones: phonesArray, phoneIds };
      collectionName = OfficeProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'OFFICE updated successfully', 'success');
        });
      break;
    case 'ITSUPPORT':
    //  updateData = { id: _id, email, phones: phonesArray, phoneIds };
      updateData = { id: _id, email, firstName, lastName };

      collectionName = ITSupportProfiles.getCollectionName();
      updateMethod.callPromise({ collectionName, updateData })
        .catch(error => swal('Error', error.message, 'error'))
        .then(() => {
          swal('Success', 'ITSUPPORT updated successfully', 'success');
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
          <Col className="text-center"><h2>{ userToUpdate.firstName }&apos;s Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={userToUpdate}>
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
                  <TextField className="col-md-6" name="role" placeholder="select role (required)" readOnly />
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
