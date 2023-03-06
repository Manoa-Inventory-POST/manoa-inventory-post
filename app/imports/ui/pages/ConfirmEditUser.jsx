import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserProfiles } from '../../api/user/UserProfileCollection';

/* Renders the EditStuff page for editing a single document. */
const ConfirmEditUser = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  console.log(_id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = UserProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = UserProfiles.find({ _id }).fetch();
    const document2 = document[0];
    console.log(document2);
    return {
      doc: document2,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Confirmation</h2></Col>
          <Card>
            <Card.Header>
              <Card.Title>{ doc.firstName } { doc.lastName } has been updated</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>First Name: { doc.firstName }</Card.Text>
              <Card.Text>Last Name: { doc.lastName }</Card.Text>
              <Card.Text>Office Building: POST</Card.Text>
              <Card.Text>Room Number: 121</Card.Text>
              <Card.Text>Phone Number: 808-XXX-XXXX</Card.Text>
              <Card.Text>Role: { doc.role }</Card.Text>
              <Card.Link href="/admin">Go to my dashboard</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ConfirmEditUser;
