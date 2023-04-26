import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Image, Card } from 'react-bootstrap';

const ClubInfoItem = (club) => (
  <Card style={{ backgroundColor: '#75ABCF', color: 'white' }}>
    <Card.Header>{club}</Card.Header>
  </Card>
);

export default ClubInfoItem;
