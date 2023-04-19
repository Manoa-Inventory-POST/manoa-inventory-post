import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single ClubAdminCard. See pages/ClubPage & pages/AdminClubPage. */
const ClubOfficerCard = ({ officer }) => (
  <Card>
    <Card.Content>
      <Card.Header>{officer.firstName} {officer.lastName}</Card.Header>
      <Card.Meta>
        <span className="email">{officer.email}</span>
      </Card.Meta>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
ClubOfficerCard.propTypes = {
  officer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default ClubOfficerCard;
