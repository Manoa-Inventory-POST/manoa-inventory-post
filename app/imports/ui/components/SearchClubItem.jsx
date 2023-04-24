import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Container, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SearchClubItem = ({ club }) => (
  <tr>
    <td><Image alt="" src={club.picture} width="180" height="180" /></td>
    <td><Link to={`/clubinfo/${club._id}`}>{`${club.name}`}</Link></td>
    <td>
      <a href={club.website}>{club.website}</a>
    </td>
    <td>{club.description}</td>
    <td>{club.interests}</td>
    <td>{club.advisor}</td>
  </tr>
);

// Require a document to be passed to this component.
SearchClubItem.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    interests: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    advisor: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default SearchClubItem;
