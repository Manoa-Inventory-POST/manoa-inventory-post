import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import ITSupportMySpaces from '../components/ITSupportMySpaces';
import ITSupportInfoBar from '../components/ITSupportInfoBar';

/* Renders a table containing all of the Faculty documents. Use <FacultyInfoBar> to render each row. */
const ITSupportHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, itsupport } = useTracker(() => {
    // Get access to Faculty documents
    const subscription = ITSupportProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Faculty documents
    const itProfiles = ITSupportProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      itsupport: itProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = itsupport[0];
  return (ready ? (
    <Container id={PAGE_IDS.ITSUPPORT_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, { currentUser.firstName } { currentUser.lastName }</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <ITSupportMySpaces />
        </Col>
        <Col md={4}>
          <ITSupportInfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ITSupportHome;