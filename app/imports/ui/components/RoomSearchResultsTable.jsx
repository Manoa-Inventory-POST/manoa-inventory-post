import React, { useEffect, useState } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
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
    // console.log(roomEntries, rdy);
    return {
      rooms: roomEntries,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (rooms && ready) {
      setFilteredRooms(rooms);
    }
  }, [rooms, ready]);

  useEffect(() => {
    let filtered = rooms;
    if (roomBuilding) {
      filtered = filtered.filter(function (obj) { return obj.building.toLowerCase().includes(roomBuilding.toLowerCase()); });
    }
    if (roomNumber) {
      filtered = filtered.filter(function (obj) { return obj.room.includes(roomNumber); });
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
      <Form className="">
        <div className="row mb-2">
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by building">Building</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="building"
              onChange={e => setRoomBuilding(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by room number">Room Number</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="room number"
              onChange={e => setRoomNumber(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row mb-4">
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by room description">Description</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="description"
              onChange={e => setRoomDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by room status">Status</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="Enter room status"
              onChange={e => setRoomStatus(e.target.value)}
            />
          </Form.Group>
        </div>
      </Form>
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
