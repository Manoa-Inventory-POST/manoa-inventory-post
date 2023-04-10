import React, { useEffect, useState } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Ports } from '../../api/room/Ports';
import PortSearchResultsTableRow from './PortSearchResultsTableRow';

const PortSearchResultsTable = () => {

  const [filteredPorts, setFilteredPorts] = useState([]);
  const [roomNum, setRoomNum] = useState('');
  const [portNumber, setPortNumber] = useState('');
  const [side, setSide] = useState('');
  const [idf, setIdf] = useState('');
  const [status, setStatus] = useState('');

  const { ready, ports } = useTracker(() => {
    const subscription = Ports.subscribePorts();
    const rdy = subscription.ready();
    const portEntries = Ports.find({}, { sort: { name: 1 } }).fetch();
    console.log(portEntries, rdy);
    return {
      ports: portEntries,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ports && ready) {
      setFilteredPorts(ports);
    }
  }, [ports, ready]);

  useEffect(() => {
    let filtered = ports;
    if (roomNum) {
      filtered = filtered.filter(function (obj) { return obj.room.toLowerCase().includes(roomNum.toLowerCase()); });
    }
    if (portNumber) {
      filtered = filtered.filter(function (obj) { return obj.port.includes(portNumber); });
    }
    if (side) {
      filtered = filtered.filter(function (obj) { return obj.side.toLowerCase().includes(side.toLowerCase()); });
    }
    if (idf) {
      filtered = filtered.filter(function (obj) { return obj.idf.toLowerCase().includes(idf.toLowerCase()); });
    }
    if (status) {
      filtered = filtered.filter(function (obj) { return obj.status.toLowerCase().includes(status.toLowerCase()); });
    }
    setFilteredPorts(filtered);
  }, [roomNum, portNumber, side, idf, status]);

  return (ready ? (
    <Container className="py-3 search-results">
      <Form className="">
        <div className="row mb-2">
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by port number">Port Number</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="enter port number"
              onChange={e => setPortNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by room">Room</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="enter room"
              onChange={e => setRoomNum(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row mb-4">
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by port side">Side</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="enter side"
              onChange={e => setSide(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by port status">Status</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="enter port status"
              onChange={e => setStatus(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-4">
            <Form.Label htmlFor="Search by idf">IDF</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="enter idf"
              onChange={e => setIdf(e.target.value)}
            />
          </Form.Group>
        </div>
      </Form>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
          <tr>
            <th>Port Number</th>
            <th>Room</th>
            <th>Side</th>
            <th>Status</th>
            <th>IDF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { filteredPorts.length === 0 ? (<tr><td>-</td></tr>) : filteredPorts.map((port) => <PortSearchResultsTableRow key={port._id} port={port} />)}
        </tbody>
      </Table>
      { filteredPorts.length === 0 ? <div className="d-flex justify-content-center pb-2">No Ports found.</div> : '' }
    </Container>
  ) : <LoadingSpinner message="Loading Ports" />);
};
export default PortSearchResultsTable;
