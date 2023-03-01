import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Container, Header, Label, Card, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/clubs/Clubs';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { ClubOfficer } from '../../api/clubs/ClubOfficer';

/** Get the clubadmin emails for this specific organization. */
function getAdvisorEmails(clubName) {
  const emails = ClubAdvisor.find().fetch().filter((clubadvisor) => clubadvisor.club === clubName);
  // console.log(emails);
  return _.pluck(emails, 'admin');
}

/** Get the interests corresponding to the profile entered. */
function getMemberInterests(profileName) {
  const interests = _.filter(ProfilesInterests.collection.find().fetch(), (profilesInterest) => profilesInterest.profile === profileName);
  return _.pluck(interests, 'interest');
}

/** Get the get relevant MEMBER profile data using corresponding email (unique). */
function getMemberData(email) {
  const profiles = _.find(Profiles.collection.find().fetch(), (member) => member.email === email);
  const interests = getMemberInterests(email);
  return _.extend({ }, profiles, { interests });
}

/** Get the corresponding CLUB profile data using the club's name (unique). */
function getClubData(name) {
  const data = Clubs.collection.findOne({ name });
  return _.extend({ }, data);
}

/** Get the interests corresponding to this specific organization. */
function getClubInterests(clubName) {
  const interests = _.filter(ClubInterests.collection.find().fetch(), (clubInterest) => clubInterest.club === clubName);
  return _.pluck(interests, 'interest');
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
    const advisorEmails = ClubAdvisor.getAdvisor(clubName);
    const adminData = advisorEmails.map(email => getMemberData(email));
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
