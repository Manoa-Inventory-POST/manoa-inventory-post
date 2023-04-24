import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { Room } from '../../api/room/RoomCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';
import { Phone } from '../../api/room/Phone';

function buildPerson(user, RoomCollection, PhoneCollection) {
  const result = {};
  result.firstName = user.firstName;
  result.lastName = user.lastName;
  result.email = user.email;
  result.position = user.position;
  result.officeHours = user.officeHours;
  result.role = user.role;
  result._id = user._id;
  let roomArr = OccupantRoom.find({ email: user.email }).fetch();
  roomArr = roomArr.map(room => room.room);
  if (roomArr.length === 1) {
    roomArr = roomArr[0];
  } else {
    roomArr = roomArr.join(', ');
  }
  console.log(roomArr);
  let phoneArr = PhoneCollection.find({ email: user.email }).fetch();
  phoneArr = phoneArr.map(item => item.phoneNum);
  if (phoneArr.length === 1) {
    phoneArr = phoneArr[0];
  } else {
    phoneArr = phoneArr.join(', ');
  }
  console.log(phoneArr);
  result.room = roomArr;
  result.phones = phoneArr;
  return result;
}

const FacultyInfoBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { faculty } = useTracker(() => {
    // Get access to Faculty documents
    const subscription = FacultyProfiles.subscribe();
    const occRoomSub = OccupantRoom.subscribeOccupantRoom();
    const phoneSub = Phone.subscribePhone();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && occRoomSub.ready() && phoneSub.ready();
    // Get the Faculty documents
    const docFaculty = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const testFac = docFaculty[0];
    console.log(testFac);
    const fac = buildPerson(testFac, Room, Phone);
    console.log(fac);
    console.log(fac.firstName);
    return {
      faculty: fac,
      ready: rdy,
    };
  }, []);
  const currentUser = faculty;

  return (
    <Card className="rounded-0">
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title>My Information</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Name: { currentUser.firstName } { currentUser.lastName }</Card.Text>
        <Card.Text>Position: { currentUser.position }</Card.Text>
        <Card.Text>Email: { currentUser.email }</Card.Text>
        <Card.Text>Office: POST { currentUser.room }</Card.Text>
        <Card.Text>Office Phone: { currentUser.phones }</Card.Text>
        <Card.Text>Office Hours: { currentUser.officeHours }</Card.Text>
        <Card.Text>Zoom Link: https://zoom.link</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FacultyInfoBar;
