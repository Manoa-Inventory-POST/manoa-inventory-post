import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import LoadingSpinner from './LoadingSpinner';
import { Room, roomPublications } from '../../api/room/RoomCollection';
import RoomSearchResultsTableRow from './RoomSearchResultsTableRow';

const RoomSearchResultsTable = () => {
  const { ready, rooms } = useTracker(() => {
    const subscription = Room.subscribe();
    const rdy = subscription.ready();
    const roomEntries = UserProfiles.find({}, { sort: { name: 1 } }).fetch();
    console.log(roomEntries, rdy);
    return {
      rooms: roomEntries,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3 search-results">
      <h2 className="ms-5 my-3">Search Results</h2>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
          <tr>
            <th>Building</th>
            <th>Room Number</th>
            <th>Room Description</th>
            <th>Room Status</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => <RoomSearchResultsTableRow key={room._id} user={room} />)}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Rooms" />);
};
export default RoomSearchResultsTable;
