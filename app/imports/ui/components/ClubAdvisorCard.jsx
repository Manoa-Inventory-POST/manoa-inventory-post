import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/* Renders a single ClubAdvisorard. */
const ClubAdvisorCard = ({ advisor }) => (
  <Card>
    <Image src={advisor.picture} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{advisor.firstName} {advisor.lastName}</Card.Header>
      <Card.Meta>
        <span className="email">{advisor.email}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
ClubAdvisorCard.propTypes = {
  advisor: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
};

export default ClubAdvisorCard;
