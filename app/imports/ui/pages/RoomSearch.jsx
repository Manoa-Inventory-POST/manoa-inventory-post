import React from 'react';
import { Container } from 'react-bootstrap';
import RoomSearchResultsTable from '../components/RoomSearchResultsTable';

const RoomSearch = () => (
  <Container>
    <h2 className="mt-4 text-center mb-2">Room Search</h2>
    <RoomSearchResultsTable />
  </Container>

);
export default RoomSearch;
