import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { removeItMethod } from '../../api/base/BaseCollection.methods';
import { Clubs } from '../../api/clubs/Clubs';

const ClubSearchResultsTableRow = ({ club }) => {

  const deleteClub = () => {
    const collectionName = Clubs.getCollectionName();
    // console.log(collectionName);
    // console.log(club);
    const clubId = club._id;
    // console.log(clubId);
    removeItMethod.callPromise({ collectionName, instance: clubId })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Club removed successfully', 'success');
      });
  };

  return (
    <tr>
      <td>{club.name}</td>
      <td>{club.website}</td>
      <td>{club.description}</td>
      <td className="d-flex">
        <Link className="btn btn-dashboard text-white me-2 d-inline" to={`/editClub/${club._id}`}>Edit</Link>
        <Button className="btn btn-danger btn-delete d-inline" onClick={deleteClub}>Delete</Button>
      </td>
    </tr>
  );
};

ClubSearchResultsTableRow.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    website: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default ClubSearchResultsTableRow;
