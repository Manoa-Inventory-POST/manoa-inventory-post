import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/clubs/Clubs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { ClubOfficer } from '../../api/clubs/ClubOfficer';
import { Interests } from '../../api/clubs/Interests';
import ClubAdvisorCard from '../components/ClubAdvisorCard';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ROLE } from '../../api/role/Role';

const FullClubInfo = () => {
  const { _id } = useParams();

  const { ready, club, interests, advCount, advisors, canEdit } = useTracker(() => {
    const sub1 = Clubs.subscribeClubs();
    const sub2 = ClubInterests.subscribeClubInterests();
    const sub3 = ClubAdvisor.subscribeClubAdvisor();
    const sub4 = Interests.subscribeInterests();
    const sub5 = FacultyProfiles.subscribeFaculty();
    const sub6 = ClubOfficer.subscribeClubOfficer();
    const sub7 = StudentProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready() && sub7.ready();
    // Get the document
    const clubItem = Clubs.findOne(_id);
    // Get interests
    let clubInterests = ClubInterests.find({ club: `${clubItem.name}` }).fetch();
    clubInterests = clubInterests.map(clubInt => clubInt.interest);
    if (clubInterests.length === 1) {
      clubInterests = clubInterests[0];
    } else {
      clubInterests = clubInterests.join(', ');
    }
    // Get advisors
    let clubAdvisors = ClubAdvisor.find({ club: `${clubItem.name}` }).fetch();
    clubAdvisors = clubAdvisors.map(item => item.advisor);
    console.log(`Club Advisors: ${clubAdvisors}`);
    let clubOfficers = ClubOfficer.find({ club: `${clubItem.name}` }).fetch();
    clubOfficers = clubOfficers.map(item => item.officer);
    console.log(`Club Officers: ${clubOfficers}`);
    const clubAdvisorInfo = clubAdvisors.map(person => FacultyProfiles.find({ email: `${person}` }).fetch());
    /*
    if (clubAdvisors.length === 1) {
      clubAdvisorInfo = clubAdvisorInfo[0];
    } else {
      clubAdvisorInfo.forEach((adv) => console.log(adv));
    }
    */
    // console.log(clubAdvisorInfo);

    let edit = false;
    console.log(1);
    const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
    console.log(2);
    const isFaculty = Roles.userIsInRole(Meteor.userId(), [ROLE.FACULTY]);
    console.log(3);
    const isStudent = Roles.userIsInRole(Meteor.userId(), [ROLE.STUDENT]);
    console.log(4);
    if (isAdmin) {
      console.log('IS ADMIN!!!');
      edit = true;
    } else if (isFaculty && clubAdvisors) {
      console.log('IS FACULTY!!!');
      const profile = FacultyProfiles.find({ userID: Meteor.userID }).fetch()[0];
      if (profile) {
        if (clubAdvisors.includes(profile.email)) {
          console.log(6);
          edit = true;
        }
      }
    } else if (isStudent && clubOfficers) {
      console.log('IS STUDENT!!!');
      const profile = StudentProfiles.find({ userID: Meteor.userID }).fetch()[0];
      console.log(5);
      if (profile) {
        if (clubOfficers.includes(profile.email)) {
          console.log(6);
          edit = true;
        }
      }
    }
    console.log(7);

    return {
      ready: rdy,
      club: clubItem,
      interests: clubInterests,
      advCount: clubAdvisors,
      advisors: clubAdvisorInfo,
      canEdit: edit,
    };
  }, []);

  function countAdv(count, advs) {
    let result = [];
    if (count.length === 1) {
      result = advs[0];
      // console.log(result);
      // result.map((item) => <ClubAdvisorCard key={item._id} advisor={item} />);
    }
    if (count.length > 1) {
      advs.forEach((a) => {
        result = a;
        // console.log(result);
        // result.map((item) => <ClubAdvisorCard key={item._id} advisor={item} />);
      });
    }
    return result;
  }

  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.FULL_CLUB_INFO}>
      <div className="justify-content-center">
        <Row className="text-center">
          <Col>
            <Row>
              <h2>{club.name}</h2>
            </Row>
            <Row className="justify-content-center py-2">
              <Image alt="" src={club.picture} style={{ width: '300px' }} />
            </Row>
            <Row>
              <h6>{club.description}</h6>
              <h6> <a href={club.website} target="_blank" rel="noreferrer">Click here to access our website!</a></h6>
            </Row>
            <Row className="py-2">
              <h4>Club Interests</h4>
              <h6>{interests}</h6>
            </Row>
            <Row>
              <h4>Advisors</h4>
              <h6 className="align-content-center text-center justify-content-center">
                { advisors.length === 0 ? ('No advisors currently listed.') : countAdv(advCount, advisors).map((adv) => <ClubAdvisorCard key={adv._id} advisor={adv} />) }
              </h6>
              {canEdit ? ([
                <Button
                  fluid
                  className="club-edit-button"
                  as={NavLink}
                  activeClassName="active"
                  exact
                  style={{ border: 'none' }}
                  to={`/editClub/${club._id}`}
                >Edit Club
                </Button>,
              ]) : ''}
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default FullClubInfo;
