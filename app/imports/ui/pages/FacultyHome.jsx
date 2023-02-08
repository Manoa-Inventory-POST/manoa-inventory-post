import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import InfoBar from '../components/InfoBar';
import SearchBox from '../components/SearchBox';
import SearchResultsTable from '../components/SearchResultsTable';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const FacultyHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = FacultyProfiles.subscribeStuffAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = FacultyProfiles.find({}).fetch();
    return {
      stuffs: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.FACULTY_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, Lydia Sollis</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <SearchBox />
          <SearchResultsTable />
        </Col>
        <Col md={4}>
          <InfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default FacultyHome;