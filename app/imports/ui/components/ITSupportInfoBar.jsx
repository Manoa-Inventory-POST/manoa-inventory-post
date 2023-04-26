import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';

const FacultyInfoBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { itsupport } = useTracker(() => {
    // Get access to Faculty documents
    const subscription = ITSupportProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Faculty documents
    const itsupportProfiles = ITSupportProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      itsupport: itsupportProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = itsupport[0];

  return (
    <Card className="rounded-0">
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title>My Information</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Name: { currentUser.firstName } { currentUser.lastName }</Card.Text>
        <Card.Text>Email: { currentUser.email }</Card.Text>
        <Card.Text>Role: { currentUser.role }</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush rounded-0">
        <ListGroup.Item>
          <Card.Link href="/map">View campus map</Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default FacultyInfoBar;
