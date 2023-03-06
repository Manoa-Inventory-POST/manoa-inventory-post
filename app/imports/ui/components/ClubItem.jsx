import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ClubItem = ({ club }) => (
  <tr>
    <td><Image alt="" src={club.picture} width="180" height="180" /></td>
    <td>{`${club.name}`}</td>
    <td>{club.website} </td>
    <td>{club.description}</td>
    <td>{club.interests}</td>
    <td>{club.advisor}</td>
  </tr>
);

// Require a document to be passed to this component.
ClubItem.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    interests: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    advisor: PropTypes.string,
  }).isRequired,
};

export default ClubItem;
