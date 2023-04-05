// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
// import { Roles } from 'meteor/alanning:roles';
// import { Link } from 'react-router-dom';
import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/clubs/Clubs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { Interests } from '../../api/clubs/Interests';

const FullClubInfo = () => {
  const { _id } = useParams();

  const { ready, club } = useTracker(() => {
    const sub1 = Clubs.subscribeClubs();
    const sub2 = ClubInterests.subscribeClubInterests();
    const sub3 = ClubAdvisor.subscribeClubAdvisor();
    const sub4 = Interests.subscribeInterests();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready();
    const clubItems = Clubs.find({}, {}).fetch();
    // Get the document
    const clubItem = Clubs.findOne(_id);
    return {
      ready: rdy,
      club: clubItem,
    };
  }, []);

  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.FULL_FACULTY_INFO}>
      <div className="justify-content-center">
        <Row className="text-center">
          <Col>
            <Row>
              <h1>
                {club.name}
              </h1>
            </Row>
            <Row>
              <h3>
                {club.position}
              </h3>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="text-end">
            <Image rounded style={{ alignSelf: 'start' }} width={300} src={faculty.picture} />
          </Col>
          <Col>
            <Row>
              <h5>Email: {faculty.email}</h5>
            </Row>
            <Row>
              <h5>Phone Number: {faculty.phone}</h5>
            </Row>
            <Row>
              <Col>
                <Row lg={2}><h5>Office Hours:</h5></Row>
                <Row lg={2}>&ensp;<h5>{faculty.officeHours}</h5></Row>
              </Col>
          </Col>
        </Row>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default FullClubInfo;
