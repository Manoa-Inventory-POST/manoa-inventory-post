import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Room } from '../../api/room/RoomCollection';
import RoomSearchResultsTableRow from './RoomSearchResultsTableRow';

const RoomSearchResultsTable = () => {

  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomBuilding, setRoomBuilding] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomStatus, setRoomStatus] = useState('');

  const { ready, rooms } = useTracker(() => {
    const subscription = Room.subscribeRoom();
    const rdy = subscription.ready();
    const roomEntries = Room.find({}, { sort: { name: 1 } }).fetch();
    console.log(roomEntries, rdy);
    return {
      rooms: roomEntries,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setFilteredRooms(rooms);
    }
  }, [ready]);

  useEffect(() => {
    let filtered = rooms;
    if (roomBuilding) {
      filtered = filtered.filter(function (obj) { return obj.building.toLowerCase().includes(roomBuilding.toLowerCase()); });
    }
    if (roomNumber) {
      filtered = filtered.filter(function (obj) { return obj.num.includes(roomNumber); });
    }
    if (roomDescription) {
      filtered = filtered.filter(function (obj) { return obj.description.toLowerCase().includes(roomDescription.toLowerCase()); });
    }
    if (roomStatus) {
      filtered = filtered.filter(function (obj) { return obj.status.toLowerCase().includes(roomStatus.toLowerCase()); });
    }
    setFilteredRooms(filtered);
  }, [roomBuilding, roomNumber, roomDescription, roomStatus]);

  return (ready ? (
    <Container className="py-3 search-results">
      <Row className="pt-3 px-3">
        <Col className="d-flex justify-content-center">
          <label htmlFor="Search by building">
            <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
              Building
            </Col>
            <input
              type="text"
              className="shadow-sm"
              placeholder="building"
              onChange={e => setRoomBuilding(e.target.value)}
            />
          </label>
        </Col>
        <Col className="d-flex justify-content-center">
          <label htmlFor="Search by room number">
            <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
              Room number
            </Col>
            <input
              type="text"
              className="shadow-sm"
              placeholder="room number"
              onChange={e => setRoomNumber(e.target.value)}
            />
          </label>
        </Col>
        <Col className="d-flex justify-content-center">
          <label htmlFor="Search by room description">
            <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
              Description
            </Col>
            <input
              type="text"
              className="shadow-sm"
              placeholder="description"
              onChange={e => setRoomDescription(e.target.value)}
            />
          </label>
        </Col>
        <Col className="d-flex justify-content-center">
          <label htmlFor="Search by room status">
            <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
              Status
            </Col>
            <input
              type="text"
              className="shadow-sm"
              placeholder="Enter room status"
              onChange={e => setRoomStatus(e.target.value)}
            />
          </label>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
          <tr>
            <th>Building</th>
            <th>Room Number</th>
            <th>Room Description</th>
            <th>Room Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { filteredRooms.length === 0 ? (<tr><td>-</td></tr>) : filteredRooms.map((room) => <RoomSearchResultsTableRow key={room._id} room={room} />)}
        </tbody>
      </Table>
      { filteredRooms.length === 0 ? <div className="d-flex justify-content-center pb-2">No rooms found.</div> : '' }
    </Container>
  ) : <LoadingSpinner message="Loading Rooms" />);
};
export default RoomSearchResultsTable;
