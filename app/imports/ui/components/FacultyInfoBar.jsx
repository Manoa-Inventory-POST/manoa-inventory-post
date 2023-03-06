import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';

const FacultyInfoBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { faculty } = useTracker(() => {
    // Get access to Faculty documents
    const subscription = FacultyProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Faculty documents
    const facultyProfiles = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      faculty: facultyProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = faculty[0];

  return (
    <Card className="rounded-0">
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title>My Information</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Name: { currentUser.firstName } { currentUser.lastName }</Card.Text>
        <Card.Text>Position: { currentUser.position }</Card.Text>
        <Card.Text>Email: { currentUser.email }</Card.Text>
        <Card.Text>Office: POST 311</Card.Text>
        <Card.Text>Office Phone: 808-123-4567</Card.Text>
        <Card.Text>Office Hours: M 3PM-5PM | W 11AM-1PM</Card.Text>
        <Card.Text>Zoom Link: https://zoom.link</Card.Text>
      </Card.Body>
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title>My Schedule</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Mon: <br /> 9:30AM-10:30AM | ICS 211 | HOLMES 215 <br /> 3:00PM-5:00PM | OFFICE HRS | POST 311 </Card.Text>
        <Card.Text>Wed: <br /> 9:30AM-10:30AM | ICS 211 | HOLMES 215 <br /> 11:00AM-1:00PM | OFFICE HRS | POST 311</Card.Text>
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
