import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import InfoBar from '../components/InfoBar';
import SearchBox from '../components/SearchBox';
// import PeopleSearchResultsTable from '../components/PeopleSearchResultsTable';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
// import RoomSearchResultsTable from '../components/RoomSearchResultsTable';

/* Renders an admin dashboard with options to search people, rooms, and schedules. Use <PeopleSearchResultsTable> to render each row of search results. */
const AdminHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, admins } = useTracker(() => {
    // Get access to Admin documents
    const subscription = AdminProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Admin documents
    const adminProfiles = AdminProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      admins: adminProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = admins[0];

  return (ready ? (
    <Container id={PAGE_IDS.ADMIN_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, { currentUser.firstName } { currentUser.lastName }</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="col-lg-8">
          <SearchBox />
        </Col>
        <Col className="col-lg-4">
          <InfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default AdminHome;
