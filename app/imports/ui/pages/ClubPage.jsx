import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { ClubOfficer } from '../../api/clubs/ClubOfficer';
import { ClubInterests } from '../../api/clubs/ClubInterests';

const ClubPage = () => {
  // get default data
  /* Connecting with default */
  const { clubRdy, advisorRdy, officerRdy, interestsRdy, faculty } = useTracker(() => {
    const clubSub = Clubs.subscribeClubs();
    const advisorSub = ClubAdvisor.subscribeClubAdvisor();
    const officerSub = ClubOfficer.subscribeClubOfficer();
    const interestSub = ClubInterests.subscribeClubInterests();
    const clubRdy = clubSub.ready();
    const clubItems = Clubs.collection.find({}).fetch();
    return {
      clubRdy: clubRdy,
      club: clubItems,
      ready: rdy,
    };
  }, []);

  const doc = Clubs.getData('Mockup Club');
  const clubName = doc.name;
  const website = doc.website;
  const description = doc.description;
  const picture = doc.picrure;
  const clubAdvisors = ClubAdvisor.getAdvisor(clubName);
  const clubOfficers = ClubOfficer.getOfficer(clubName);
  const clubInterests = ClubInterests.getInterest(clubName);
  return (
    <Container>
      {clubName}
      {website}
      {description}
      {picture}
      {clubAdvisors}
      {clubOfficers}
      {clubInterests}
    </Container>
  );
};

export default ClubPage;
