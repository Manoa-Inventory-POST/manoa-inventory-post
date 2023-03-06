import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Container, Header, Label, Card, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { ClubOfficer } from '../../api/clubs/ClubOfficer';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { UserInterests } from '../../api/clubs/UserInterests';

/**
 * Returns an array of Advisor emails for this club.
 * @param clubName the name of the club.
 * @return array of emails
 */
function getAdvisorEmails(clubName) {
  const emails = ClubAdvisor.find().fetch().filter((clubadvisor) => clubadvisor.club === clubName);
  return emails;
}

/**
 * Returns an array of Officer emails for this club.
 * @param clubName the name of the club.
 * @return array of emails
 */
function getOfficerEmails(clubName) {
  const emails = ClubOfficer.find().fetch().filter((clubofficer) => clubofficer.club === clubName);
  return emails;
}

/**
 * Checks if the logged in user is either an Advisor or an Officer.
 * @param email user's email
 * @param clubName the name of the club.
 * @return true if can edit
 * @reutrn false if cannot
 */
function checkEdit(email, clubName) {
  const advisors = getAdvisorEmails(clubName);
  const officers = getOfficerEmails(clubName);
  if (advisors.includes(email) || officers.includes(email)) {
    return true;
  }
  return false;
}

/** Get the interests corresponding to the profile entered. */
function getMemberInterests(email) {
  const interests = UserInterests.find().fetch().filter((interest) => interest.email === email);
  return interests;
}

function getAdvisorData(email) {
  const profile = FacultyProfiles.checkEmail(email);
  return profile;
}

function getOfficerData(email) {
  const profile = StudentProfiles.checkEmail(email);
  return profile;
}

/** Get the corresponding CLUB profile data using the club's name (unique). */
function getClubData(name) {
  const data = Clubs.getData(name);
  return data;
}

/** Get the interests corresponding to this specific organization. */
function getClubInterests(clubName) {
  const interests = ClubInterests.getInterest(clubName);
  return interests;
}

/** Renders a color-blocked static ClubPage page. */
class ClubPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  // eslint-disable-next-line react/sort-comp
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const doc = Clubs.collection.findOne(this.props.documentId);
    const clubName = doc.name;
    // array of club's advisors' emails, can do a forEach or something
    const advisorEmails = getAdvisorEmails(clubName);
    const officerEmails = getOfficerEmails(clubName);
    const advisorData = advisorEmails.map(email => getAdvisorData(email));
    const officerData = officerEmails.map(email => getOfficerData(email));
    const club = getClubData(clubName);
    const interests = getClubInterests(clubName);
    return (
      <div id="club-page">
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Divider />
            <Header as="h1">{club.name}</Header>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Image src={club.picture} size="large" centered />
        </div>
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Divider />
            <Header as="h3">{club.description}</Header>
            <Label href={club.homepage} className="user-home-page-label" target="_blank">Click here to access the homepage</Label>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Header as="h1">Club Interests</Header>
            <div>
              {_.map(interests, (interest, index) => <Label key={index} className="club-admin-label">{interest}</Label>)}
            </div>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Header as="h1">Admins</Header>
            <Card.Group centered>
              {_.map(adminData, (profile, index) => <ClubAdminCard key={index} member={profile} />)}
            </Card.Group>
            <Divider />
          </Container>
        </div>
      </div>
    );
  }
}

ClubPage.propTypes = {
  documentId: PropTypes.string.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Clubs.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesClubs.userPublicationName);
  const sub3 = Meteor.subscribe(ClubInterests.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub5 = Meteor.subscribe(Profiles.userPublicationName);
  const sub6 = Meteor.subscribe(ClubAdmin.userPublicationName);
  return {
    documentId,
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
  };
})(ClubPage);
