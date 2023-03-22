import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';

const displayRoles = (student) => {
  const results = [];
  if (student.TA) { results.push('TA'); }
  if (student.RA) { results.push('RA'); }
  if (student.graduate) { results.push('Graduate'); }
  if (student.undergraduate) { results.push('Undergraduate'); }

  return results;
};

const StudentInfoBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { student } = useTracker(() => {
    // Get access to Student documents
    const subscription = StudentProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Student documents
    const studentProfiles = StudentProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      student: studentProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = student[0];

  return (
    <Card className="rounded-0">
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title>My Information</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Name: { currentUser.firstName } { currentUser.lastName }</Card.Text>
        <Card.Text>Email: { currentUser.email }</Card.Text>
        <Card.Text>Role(s): {displayRoles(currentUser).map((position) => `[${position}]`)}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush rounded-0">
        <ListGroup.Item>
          <Card.Link href="/map">View campus map</Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default StudentInfoBar;
