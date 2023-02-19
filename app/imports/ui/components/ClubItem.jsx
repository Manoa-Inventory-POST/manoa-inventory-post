import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ClubItem = ({ club }) => (
  <tr>
    <td><Image alt="" src={club.picture} width="180" height="180" /></td>
    <td>{club.name}</td>
    <td>{club.website}</td>
    <td>{club.description}</td>
    <td>{club.interests}</td>
  </tr>
);

// Require a document to be passed to this component.
ClubItem.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
    picture: PropTypes.string,
    description: PropTypes.string,
    interests: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubItem;
