// import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Row, Table, Container, Accordion } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import AccordionBody from 'react-bootstrap/AccordionBody';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Ports } from '../../api/room/Ports';
import PortItem from '../components/PortItem';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const PortSearch = () => {
  const [filteredPorts, setFilteredPorts] = useState([]);
  const [filteredName, setFilteredName] = useState('');
  const [filteredRoom, setFilteredRoom] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('');
  const [filteredSide, setFilteredSide] = useState('');
  const [filteredIDF, setFilteredIDF] = useState('');

  const { ready, ports } = useTracker(() => {
    const sub1 = Ports.subscribePorts();
    const rdy = sub1.ready();
    const portItems = Ports.find({}).fetch();
    return {
      ports: portItems,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setFilteredPorts(ports);
    }
  }, [ready]);

  useEffect(() => {
    let filtered = ports;
    if (filteredName) {
      filtered = filtered.filter(function (obj) { return obj.name.toLowerCase().includes(filteredName.toLowerCase()); });
    }
    if (filteredRoom) {
      filtered = filtered.filter(function (obj) { return obj.room.toLowerCase().includes(filteredRoom.toLowerCase()); });
    }
    if (filteredStatus) {
      filtered = filtered.filter(function (obj) { return obj.status.toLowerCase().includes(filteredStatus.toLowerCase()); });
    }
    if (filteredSide) {
      filtered = filtered.filter(function (obj) { return obj.side.toLowerCase().includes(filteredSide.toLowerCase()); });
    }
    if (filteredIDF) {
      filtered = filtered.filter(function (obj) { return obj.idf.toLowerCase().includes(filteredIDF.toLowerCase()); });
    }
    setFilteredPorts(filtered);
  }, [filteredName, filteredRoom, filteredSide, filteredIDF, filteredStatus]);

  const returnFilter = () => (
    <div className="pb-3" id={PAGE_IDS.CLUB_SEARCH}>
      <h2 className="mt-4 text-center mb-2">Port Search</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header id={COMPONENT_IDS.PORT_FILTER_OPTIONS}>
              Filter Options
            </Accordion.Header>
            <AccordionBody>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Port
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFilteredName(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by interest">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Room
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFilteredRoom(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Side
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFilteredSide(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      IDF
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFilteredIDF(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Status
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFilteredStatus(e.target.value)}
                    />
                  </label>
                </Col>
              </Row>
            </AccordionBody>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );

  const returnList = () => (
    <div>
      <Table striped className="border border-2">
        <thead style={{ zIndex: 200 }}>
          <tr>
            <th>Port</th>
            <th>Room</th>
            <th>Side</th>
            <th>IDF</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPorts.length === 0 ? (
            <tr>
              <td>-</td>
            </tr>
          ) : filteredPorts.map((portss) => <PortItem key={portss._id} port={portss} />)}
        </tbody>
      </Table>
      {filteredPorts.length === 0 ? <div className="d-flex justify-content-center pb-2"> No ports found. </div> : ''}
    </div>
  );

  return (
    <Container id={PAGE_IDS.PORT_SEARCH}>
      <div className="justify-content-center">
        <Row id="dashboard-screen">
          <Col className="mx-3">
            <Row id="dashboard-filter"> {returnFilter()}</Row>
            {ready ? <Row id="dashboard-list">{returnList()}</Row> : ''}
            {ready ? '' : <LoadingSpinner />}
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default PortSearch;
