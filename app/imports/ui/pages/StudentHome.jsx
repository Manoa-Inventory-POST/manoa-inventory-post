import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import StudentInfoBar from '../components/StudentInfoBar';
import StudentMySpaces from '../components/StudentMySpaces';

const StudentHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, student } = useTracker(() => {
    // Get access to Student documents
    const subscription = StudentProfiles.subscribe();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Student documents
    const studentProfiles = StudentProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    return {
      student: studentProfiles,
      ready: rdy,
    };
  }, []);
  const currentUser = student[0];
  return (ready ? (
    <Container id={PAGE_IDS.STUDENT_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, {currentUser.firstName} {currentUser.lastName}</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <StudentMySpaces />
        </Col>
        <Col md={4}>
          <StudentInfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentHome;