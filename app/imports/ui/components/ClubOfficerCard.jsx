import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single ClubAdminCard. See pages/ClubPage & pages/AdminClubPage. */
class ClubAdvisorCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.member.picture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.member.firstName} {this.props.member.lastName}</Card.Header>
          <Card.Meta>
            <span className="email">{this.props.member.email}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ClubAdvisorCard.propTypes = {
  member: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default ClubAdvisorCard;
