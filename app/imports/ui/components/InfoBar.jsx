import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';

const InfoBar = () => {

  /* Renders an admin dashboard with options to search people, rooms, and schedules. Use <PeopleSearchResultsTable> to render each row of search results. */
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { admins } = useTracker(() => {
    // Get access to Admin documents
    const subscription = AdminProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Admin documents
    const adminProfiles = AdminProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      admins: adminProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = admins[0];

  return (
    <Card className="rounded-0">
      <Card.Header className="rounded-0 dashboard-header">
        <Card.Title>My Information</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>Name: { currentUser.firstName } { currentUser.lastName }</Card.Text>
        <Card.Text>Role: { currentUser.role }</Card.Text>
        <Card.Text>Email: { currentUser.email }</Card.Text>
      </Card.Body>
      <Card.Header className="dashboard-header">
        <Card.Title>Quick Links</Card.Title>
      </Card.Header>
      <ListGroup className="list-group-flush rounded-0">
        <ListGroup.Item>
          Bulk upload:
          <Card.Link className="ms-2" href="#">rooms</Card.Link>
          <Card.Link href="#">people</Card.Link>
          <Card.Link href="#">schedules</Card.Link>
        </ListGroup.Item>
        <ListGroup.Item>
          Add one:
          <Card.Link className="ms-2" href="/createRoom">room</Card.Link>
          <Card.Link href="/createUser">person</Card.Link>
          <Card.Link href="/createSchedule">schedule</Card.Link>
        </ListGroup.Item>
        <ListGroup.Item>
          Search:
          <Card.Link className="ms-2" href="#">rooms</Card.Link>
          <Card.Link href="#">people</Card.Link>
          <Card.Link href="#">schedules</Card.Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Card.Link href="#">View campus map</Card.Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
export default InfoBar;
