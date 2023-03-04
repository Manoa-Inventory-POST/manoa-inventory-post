// import { Meteor } from 'meteor/meteor';
// import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
// import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { Col, Row, Table, Container } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
// import PropTypes from 'prop-types';
import LoadingSpinner from '../components/LoadingSpinner';
// import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import ClubItem from '../components/ClubItem';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const ClubSearch = () => {
  const ready = true;
  const clubProfiles = [
    {
      name: 'Club Moore', _id: 'hi', homepage: 'https://courses.ics.hawaii.edu/ics414s23/', description: 'Cam Moore Fan Club', picture: '/images/cam-moore.jpg', interests: ['Cam Moore'], adminList: ['Cam Moore'],
    },
    {
      name: 'Better Club Moore', _id: 'hi2', homepage: 'https://courses.ics.hawaii.edu/ics414s23/', description: 'Cam Moore Fan Club', picture: '/images/cam-moore.jpg', interests: ['Cam Moore'], adminList: ['Cam Moore'],
    },
  ];

  const [sortingBy] = useState('name');
  clubProfiles.sort((a, b) => a[sortingBy].localeCompare(b[sortingBy]));

  return (ready ? (
    <Container id={PAGE_IDS.CLUB_SEARCH} className="py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <Col className="text-center">
            <h2>Club Search</h2>
          </Col>
          <Table hover>
            <thead>
              <tr>
                <th> </th>
                <th>Name</th>
                <th>Homepage</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {clubProfiles.map((profile) => <ClubItem key={profile._id} club={profile} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Club Information" />);
};

export default ClubSearch;
