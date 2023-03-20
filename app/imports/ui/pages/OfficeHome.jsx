import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import SearchBox from '../components/SearchBox';
import WorkerInfoBar from '../components/WorkerInfoBar';

/* Renders a table containing all of the IT Support documents. Use <ITSupportInfoBar> to render each row. */
const OfficeHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, office } = useTracker(() => {
    // Get access to Faculty documents
    const subscription = OfficeProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Faculty documents
    const officeProfiles = OfficeProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      office: officeProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = office[0];
  return (ready ? (
    <Container id={PAGE_IDS.OFFICE_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, { currentUser.firstName } { currentUser.lastName }</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <SearchBox />
        </Col>
        <Col md={4}>
          <WorkerInfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default OfficeHome;
