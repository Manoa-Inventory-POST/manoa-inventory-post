import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';
import { Phone } from '../../api/room/Phone';

const FacultyInfoBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { faculty, office, phone } = useTracker(() => {
    // Get access to Faculty documents
    const sub1 = FacultyProfiles.subscribe();
    const sub2 = OccupantRoom.subscribeOccupantRoom();
    const sub3 = Phone.subscribePhone();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready() && sub3.ready();
    // Get the Faculty documents
    let facultyProfiles = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    facultyProfiles = facultyProfiles[0];
    let officeItem = OccupantRoom.find({ email: `${facultyProfiles.email}` }).fetch();
    officeItem = officeItem.map(num => num.room);
    if (officeItem === 1) {
      officeItem = officeItem[0];
    } else {
      officeItem = officeItem.join(', ');
    }
    let phoneItem = Phone.find({ email: `${facultyProfiles.email}` }).fetch();
    phoneItem = phoneItem.map(num => num.phoneNum);
    if (phoneItem.length === 1) {
      phoneItem = phoneItem[0];
    } else {
      phoneItem = phoneItem.join(', ');
    }
    return {
      faculty: facultyProfiles,
      office: officeItem,
      phone: phoneItem,
      ready: rdy,
    };
  }, []);

  return (
    <Card className="rounded-0">
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title>My Information</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Name: { faculty.firstName } { faculty.lastName }</Card.Text>
        <Card.Text>Position: { faculty.position }</Card.Text>
        <Card.Text>Email: { faculty.email }</Card.Text>
        <Card.Text>Office: POST { office }</Card.Text>
        <Card.Text>Office Phone: { phone }</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush rounded-0">
        <ListGroup.Item>
          <Card.Link href="#">View campus map</Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default FacultyInfoBar;
