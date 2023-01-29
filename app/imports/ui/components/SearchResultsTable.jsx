import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';
import SearchResultsTableRow from './SearchResultsTableRow';

const SearchResultsTable = () => {
  const { ready, users } = useTracker(() => {
    const subscription = UserProfiles.subscribe();
    const rdy = subscription.ready();
    const userEntries = UserProfiles.find({}, { sort: { name: 1 } }).fetch();
    return {
      users: userEntries,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="container-fluid py-3 search-results">
      <h2 className="ms-5 my-3">Search Results</h2>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Office Building</th>
            <th>Room</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <SearchResultsTableRow key={user._id} user={user} />)}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Users" />);
};
export default SearchResultsTable;
