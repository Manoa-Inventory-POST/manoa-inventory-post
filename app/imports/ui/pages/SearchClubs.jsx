// import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Row, Table, Container, Accordion } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import AccordionBody from 'react-bootstrap/AccordionBody';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import ClubItem from '../components/ClubItem';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { Interests } from '../../api/clubs/Interests';

/* Renders a table containing all of the Faculty documents. Use <FacultyItem> to render each row. */
const ClubSearch = () => {
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [filteredName, setFilteredName] = useState('');
  const [filteredInterests, setFilteredInterests] = useState('');
  const [filteredAdmins, setFilteredAdmins] = useState('');

  const { ready, clubProfiles } = useTracker(() => {
    const sub1 = Clubs.subscribeClubs();
    const sub2 = ClubInterests.subscribeClubInterests();
    const sub3 = ClubAdvisor.subscribeClubAdvisor();
    const sub4 = Interests.subscribeInterests();
    const rdy = sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready();
    const clubItems = Clubs.find({}, {}).fetch();
    const clubAdvisors = ClubAdvisor.find({}, {}).fetch();
    console.log(clubAdvisors);

    function buildClubInfo(club, ClubInterestsColl, ClubAdvisorColl) {
      const result = {};
      result.name = club.name;
      result.website = club.website;
      result.description = club.description;
      result.picture = club.picture;
      let clubInterestsArray = ClubInterestsColl.find({ club: club.name }, {}).fetch();
      clubInterestsArray = clubInterestsArray.map(clubInt => clubInt.interest);
      if (clubInterestsArray.length === 1) {
        clubInterestsArray = clubInterestsArray[0];
      } else {
        clubInterestsArray = clubInterestsArray.join(', ');
      }
      console.log(clubInterestsArray);
      let clubAdvisorsArray = ClubAdvisorColl.find({ club: club.name }, {}).fetch();
      clubAdvisorsArray = clubAdvisorsArray.map(item => item.advisor);
      if (clubAdvisorsArray.length === 1) {
        clubAdvisorsArray = clubAdvisorsArray[0];
      } else {
        clubAdvisorsArray = clubAdvisorsArray.join(', ');
      }
      console.log(clubAdvisorsArray);
      result.interests = clubInterestsArray;
      result.advisor = clubAdvisorsArray;
      return result;
    }

    const clubInfoObjects = clubItems.map(item => buildClubInfo(item, ClubInterests, ClubAdvisor));
    console.log(clubInfoObjects);

    return {
      clubProfiles: clubInfoObjects,
      ready: rdy,
    };
  }, []);

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
      filtered = filtered.filter(function (obj) { return obj.interests.toLocaleString().toLowerCase().includes(filteredInterests.toLowerCase()); });
    }
    if (filteredAdmins) {
      filtered = filtered.filter(function (obj) { return obj.advisor.toLocaleString().toLowerCase().includes(filteredAdmins.toLowerCase()); });
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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
            <th>Name</th>
            <th>Website</th>
            <th>Description</th>
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
