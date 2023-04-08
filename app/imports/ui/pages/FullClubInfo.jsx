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

  const { ready, club, interests, advisors } = useTracker(() => {
    const sub1 = Clubs.subscribeClubs();
    const sub2 = ClubInterests.subscribeClubInterests();
    const sub3 = ClubAdvisor.subscribeClubAdvisor();
    const sub4 = Interests.subscribeInterests();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready();
    // Get the document
    const clubItem = Clubs.findOne(_id);
    console.log(clubItem);
    // Get interests
    let clubInterests = ClubInterests.find({ club: `${clubItem.name}` }).fetch();
    clubInterests = clubInterests.map(clubInt => clubInt.interest);
    if (clubInterests.length === 1) {
      clubInterests = clubInterests[0];
    } else {
      clubInterests = clubInterests.join(', ');
    }
    console.log(clubInterests);
    // Get advisors
    let clubAdvisors = ClubAdvisor.find({ club: `${clubItem.name}` }).fetch();
    clubAdvisors = clubAdvisors.map(item => item.advisor);
    if (clubAdvisors.length === 1) {
      clubAdvisors = clubAdvisors[0];
    } else if (clubAdvisors.length === 0) {
      clubAdvisors = 'No advisors currently listed.';
    } else {
      clubAdvisors = clubAdvisors.join(', ');
    }
    console.log(clubAdvisors);
    /*
    // Get interests and admin info
    function buildClubInfo(clubs, ClubInterestsColl, ClubAdvisorColl) {
      const result = {};
      result.name = clubs.name;
      let clubInterestsArray = ClubInterestsColl.find({ club: clubs.name }, {}).fetch();
      clubInterestsArray = clubInterestsArray.map(clubInt => clubInt.interest);
      if (clubInterestsArray.length === 1) {
        clubInterestsArray = clubInterestsArray[0];
      } else {
        clubInterestsArray = clubInterestsArray.join(', ');
      }

      let clubAdvisorsArray = ClubAdvisorColl.find({ club: clubs.name }, {}).fetch();
      clubAdvisorsArray = clubAdvisorsArray.map(item => item.advisor);
      if (clubAdvisorsArray.length === 1) {
        clubAdvisorsArray = clubAdvisorsArray[0];
      } else {
        clubAdvisorsArray = clubAdvisorsArray.join(', ');
      }

      result.interests = clubInterestsArray;
      result.advisor = clubAdvisorsArray;
      return result;
    }
    const clubInfoObjects = clubItem.map(item => buildClubInfo(item, ClubInterests, ClubAdvisor));

    clubInterests = clubInterests.map(clubInt => clubInt.interest);
    if (clubInterests.length === 1) {
      clubInterests = clubInterests[0];
    } else {
      clubInterests = clubInterests.join(', ');
    }
    */
    return {
      ready: rdy,
      club: clubItem,
      interests: clubInterests,
      advisors: clubAdvisors,
    };
  }, []);

  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.FULL_CLUB_INFO}>
      <div className="justify-content-center">
        <Row className="text-center">
          <Col>
            <Row>
              <h2>{club.name}</h2>
            </Row>
            <Row className="justify-content-center py-2">
              <Image alt="" src={club.picture} style={{ maxWidth: '15%' }} />
            </Row>
            <Row>
              <h6>{club.description}</h6>
              <h6><a href={club.website}>Click here to access our website!</a></h6>
            </Row>
            <Row className="py-2">
              <h4>Club Interests</h4>
              <h6>{interests}</h6>
            </Row>
            <Row>
              <h4>Advisors</h4>
              <h6>{advisors}</h6>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default FullClubInfo;
