import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import FacultyInfoBar from '../components/FacultyInfoBar';
import MySpaces from '../components/MySpaces';

/* Renders a table containing all of the Faculty documents. Use <FacultyInfoBar> to render each row. */
const FacultyHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, faculty } = useTracker(() => {
    // Get access to Faculty documents
    const subscription = FacultyProfiles.subscribeFaculty();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Faculty documents
    const facultyProfiles = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      faculty: facultyProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = faculty[0];

  return (ready ? (
    <Container id={PAGE_IDS.FACULTY_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, { currentUser.firstName } { currentUser.lastName }</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <MySpaces />
        </Col>
        <Col md={4}>
          <FacultyInfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default FacultyHome;
