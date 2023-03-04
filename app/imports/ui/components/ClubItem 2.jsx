import React from 'react';
import { Image } from 'react-bootstrap';
// import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';

const ClubItem = ({ club }) => (
  <tr>
    <td><Image alt="" src={club.picture} width="180" height="180" /></td>
    <td>{`${club.name}`}</td>
    <td>{club.homepage} </td>
    <td>{club.description}</td>
  </tr>
);

// Require a document to be passed to this component.
ClubItem.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    homepage: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    // interests: PropTypes.array,
    // adminList: PropTypes.array,
  }).isRequired,
};

export default ClubItem;
