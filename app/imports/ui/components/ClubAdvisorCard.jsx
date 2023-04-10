import React from 'react';
import { Card, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CardHeader from 'react-bootstrap/CardHeader';
import { Link } from 'react-router-dom';

/* Renders a single ClubAdvisorard. */
const ClubAdvisorCard = ({ advisor }) => (
  <Card style={{ width: '12rem' }}>
    <Link to={`/facultyinfo/${advisor._id}`}>
      <Image style={{ width: '10rem' }} src={advisor.picture} />
      <CardHeader className="py-2">{advisor.firstName} {advisor.lastName}</CardHeader>
      <p className="email pt-2">{advisor.email}</p>
    </Link>
  </Card>
);

// Require a document to be passed to this component.
ClubAdvisorCard.propTypes = {
  advisor: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubAdvisorCard;
