import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { Accordion, Col, Row, Table, Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubOfficer } from '../../api/clubs/ClubOfficer';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';

function getAdvisors(club) {

}

const ClubPage = () => {
  const doc = Clubs.findOne(this.props.documentId);
  const clubName = doc.name;


};

export default ClubPage;
