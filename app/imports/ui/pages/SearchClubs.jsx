// import { Meteor } from 'meteor/meteor';
// import React, { useEffect, useState } from 'react';
import React, { useState, useEffect } from 'react';
// import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { Col, Row, Table, Container, Accordion } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
// import PropTypes from 'prop-types';
import AccordionBody from 'react-bootstrap/AccordionBody';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import ClubItem from '../components/ClubItem';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const ClubSearch = () => {
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [filteredName, setFilteredName] = useState('');
  const [filteredInterests, setFilteredInterests] = useState('');
  const [filteredAdmins, setFilteredAdmins] = useState('');
  const ready = true;
  const clubProfiles = [
    {
      name: 'Club Moore', _id: 'hi', homepage: 'https://courses.ics.hawaii.edu/ics414s23/', description: 'Cam Moore Fan Club', picture: '/images/cam-moore.jpg', interests: ['Moore'], adminList: ['Cam'],
    },
    {
      name: 'Better Club Moore', _id: 'hi2', homepage: 'https://courses.ics.hawaii.edu/ics414s23/', description: 'Cam Moore Fan Club', picture: '/images/cam-moore.jpg', interests: ['Cam'], adminList: ['Moore'],
    },
  ];

  useEffect(() => {
    if (ready) {
      setFilteredClubs(clubProfiles);
    }
  }, [ready]);

  useEffect(() => {
    let filtered = clubProfiles;
    if (filteredName) {
      filtered = filtered.filter(function (obj) { return obj.name.toLowerCase().includes(filteredName.toLowerCase()); });
    }
    if (filteredInterests) {
      filtered = filtered.filter(function (obj) { return obj.interests.map(function (s) { return s.toLowerCase(); }).includes(filteredInterests); });
    }
    if (filteredAdmins) {
      filtered = filtered.filter(function (obj) { return obj.adminList.map(function (s) { return s.toLowerCase(); }).includes(filteredAdmins); });
    }
    setFilteredClubs(filtered);
  }, [filteredName, filteredInterests, filteredAdmins]);

  const returnFilter = () => (
    <div className="pb-3">
      <h2 className="mt-4 text-center mb-2">Club Search</h2>
      <div id="filter-border">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header id={COMPONENT_IDS.CLUB_FILTER_OPTIONS}>
              Filter Options
            </Accordion.Header>
            <AccordionBody>
              <Row className="pt-3 px-3">
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Name
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
                      Interests
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFilteredInterests(e.target.value)}
                    />
                  </label>
                </Col>
                <Col className="d-flex justify-content-center">
                  <label htmlFor="Search by name">
                    <Col className="d-flex justify-content-center mb-1 small" style={{ color: '#313131' }}>
                      Advisor
                    </Col>
                    <input
                      type="text"
                      className="shadow-sm"
                      onChange={e => setFilteredAdmins(e.target.value)}
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
            <th />
            <th>Name</th>
            <th>Interests</th>
            <th>Advisor</th>
          </tr>
        </thead>
        <tbody>
          {filteredClubs.length === 0 ? (
            <tr>
              <td>-</td>
            </tr>
          ) : filteredClubs.map((clubs) => <ClubItem key={clubs._id} club={clubs} />)}
        </tbody>
      </Table>
      {filteredClubs.length === 0 ? <div className="d-flex justify-content-center pb-2"> No club found. </div> : ''}
    </div>
  );

  return (
    <Container id={PAGE_IDS.CLUB_SEARCH}>
      <div className="d-flex justify-content-center">
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
export default ClubSearch;
