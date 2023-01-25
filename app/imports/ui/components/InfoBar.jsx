import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const user = [{ firstName: 'Philip', lastName: 'Johnson', address: 'POST 307, University of Hawaii', role: 'Administrator',
  description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
  'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
}];
const InfoBar = () => (
  <Card className="rounded-0">
    <Card.Header className="rounded-0 dashboard-header">
      <Card.Title>My Information</Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>Name: Lydia Sollis</Card.Text>
      <Card.Text>Role: Admin</Card.Text>
      <Card.Text>Email: lydia.j.sollis@gmail.com</Card.Text>
    </Card.Body>
    <Card.Header className="dashboard-header">
      <Card.Title>Quick Links</Card.Title>
    </Card.Header>
    <ListGroup className="list-group-flush rounded-0">
      <ListGroup.Item>
        Bulk upload: <Card.Link className="ms-2" href="#">spaces</Card.Link><Card.Link href="#">people</Card.Link><Card.Link href="#">schedules</Card.Link>
      </ListGroup.Item>
      <ListGroup.Item>
        Search: <Card.Link className="ms-2" href="#">spaces</Card.Link><Card.Link href="#">people</Card.Link><Card.Link href="#">schedules</Card.Link>
      </ListGroup.Item>
      <ListGroup.Item>
        <Card.Link href="#">View campus map</Card.Link>
      </ListGroup.Item>
    </ListGroup>
  </Card>
);
export default InfoBar;
