import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card } from 'react-bootstrap';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';
import { Phone } from '../../api/room/Phone';
import FacultyMySpacesCard from './FacultyMySpacesCard';
import { PortRoom } from '../../api/room/PortRoom';

function buildOffices(user, rooms) {
  const result = [];
  for (let i = 0; i < rooms.length; i++) {
    const resultItem = {};
    resultItem.room = rooms[i].room;
    const roomNum = rooms[i].room;
    const phNum = Phone.find({ room: roomNum }, {}).fetch();
    const portsArray = PortRoom.find({ room: roomNum }, {}).fetch();
    if (portsArray.length === 0) {
      resultItem.ports = 'N/A';
    } else if (portsArray.length === 1) {
      resultItem.ports = portsArray[0];
    } else {
      resultItem.ports = portsArray.join(', ');
    }
    resultItem.phone = phNum.length > 0 ? (phNum[0].phoneNum) : 'N/A';
    resultItem.hours = user.officeHours;
    resultItem._id = rooms[i]._id;
    result[i] = resultItem;
  }
  return result;
}

const FacultyMySpaces = () => {

  const { offices } = useTracker(() => {
    // Get access to Faculty documents
    const subscription = FacultyProfiles.subscribe();
    const occRoomSub = OccupantRoom.subscribeOccupantRoom();
    const phoneSub = Phone.subscribePhone();
    const portSub = PortRoom.subscribePortRoom();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && occRoomSub.ready() && phoneSub.ready() && portSub.ready();
    // Get the Faculty documents
    let docFaculty = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    docFaculty = docFaculty[0];
    // const email = docFaculty.email;
    // console.log(email);
    const docRooms = OccupantRoom.find({ email: docFaculty.email }, {}).fetch();
    console.log(docFaculty);
    console.log(docFaculty.email);
    console.log(docRooms);
    const off = buildOffices(docFaculty, docRooms);
    console.log(off);
    return {
      offices: off,
      ready: rdy,
    };
  }, []);

  return (
    <Card className="rounded-0">
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title><h1>My Spaces</h1></Card.Title>
      </Card.Header>
      { offices.length === 0 ? (<p>NO SPACES</p>) : offices.map((office) => <FacultyMySpacesCard key={office._id} office={office} />)}
    </Card>
  );
};

export default FacultyMySpaces;
