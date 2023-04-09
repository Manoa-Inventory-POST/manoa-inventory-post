import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';
import { Phone } from '../../api/room/Phone';
import { Room } from '../../api/room/RoomCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';

const ProfileTemplate = () => {

  const id = Meteor.user()._id;
  console.log(`Meteor.user()._id: ${id}`);

  const { doc, roomNums } = useTracker(() => {

    const subUser = UserProfiles.subscribe();
    const subAdmin = AdminProfiles.subscribe();
    const subFaculty = FacultyProfiles.subscribeFaculty();
    const subStudent = StudentProfiles.subscribe();
    const subOffice = OfficeProfiles.subscribe();
    const subIT = ITSupportProfiles.subscribe();
    const subOccRoom = OccupantRoom.subscribeOccupantRoom();
    const subRoom = Room.subscribeRoom();
    const subPhone = Phone.subscribePhone();

    const rdy = subUser.ready() && subAdmin.ready() && subFaculty.ready() && subStudent.ready() && subOffice.ready()
      && subIT.ready() && subOccRoom.ready() && subRoom.ready() && subPhone.ready();

    const docUser = UserProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docAdmin = AdminProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docFaculty = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docStudent = StudentProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docOffice = OfficeProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docIT = ITSupportProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    console.log(docAdmin);

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

    } else if (docStudent.length > 0) {
      userToEdit = docStudent[0];
    } else if (docOffice.length > 0) {
      userToEdit = docOffice[0];
    } else if (docIT.length > 0) {
      userToEdit = docIT[0];
    } else {
      console.log('user not found');
    }

    const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
    console.log(roomEntries);

    return {
      roomNums: roomEntries,
      doc: userToEdit,
      ready: rdy,
    };

  }, [id]);

  const roomValues = [];
  for (let i = 0; i < roomNums.length; i++) {
    roomValues[i] = roomNums[i].room;
  }

  const UserFormSchema = new SimpleSchema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    phoneIds: { type: Array, optional: true },
    'phoneIds.$': { type: String, optional: true },
    occupantRoomIds: { type: Array, optional: true },
    'occupantRoomIds.$': { type: String, optional: true },
    rooms: { type: Array, label: 'Office(s)', optional: true },
    'rooms.$': { type: String, allowedValues: roomValues },
    phones: { type: String, label: 'Phone Numbers', optional: true },
    role: String,
    _id: String,
  });

  const bridge = new SimpleSchema2Bridge(UserFormSchema);

  const submit = (data) => {
    console.log('submit');
    const { firstName, lastName, email, _id, role, rooms, occupantRoomIds, phones, phoneIds } = data;
    console.log(data);
    let phonesArray;
    let collectionName;
    let updateData = { id: _id, firstName, lastName };

    switch (role) {
    case 'STUDENT':
      console.log('STUDENT SWITCH');
      collectionName = StudentProfiles.getCollectionName();
      updateData = { id: _id, firstName, lastName, email };
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
      updateData = { id: _id, email, firstName, lastName, rooms, occupantRoomIds, phones: phonesArray, phoneIds };
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

    <Container className="py-3" id={PAGE_IDS.PROFILE}>
      <Row className="justify-content-center">
        <Col className="col-lg-10">
          <Col className="text-center"><h2>Profile Settings</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body className="px-5">
                <TextField name="firstName" placeholder="Your first name (required)" />
                <TextField name="lastName" placeholder="Your last name (required)" />
                <TextField name="email" placeholder="Your email (required)" readOnly />
                <TextField name="phones" placeholder="Enter one or more phone numbers as digits only, separated by a comma, ex: 8081334137,9155452155" />
                <SelectField name="rooms" multiple inline />
                <HiddenField name="password" value="changeme" />
                <HiddenField name="role" />
                <HiddenField name="phoneIds" />
                <HiddenField name="occupantRoomIds" />
                <HiddenField name="_id" />
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

export default ProfileTemplate;
