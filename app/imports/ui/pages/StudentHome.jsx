import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import StudentInfoBar from '../components/StudentInfoBar';
import StudentMySpaces from '../components/StudentMySpaces';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';

const StudentHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, student, requests } = useTracker(() => {
    // Get access to Student documents
    const sub1 = StudentProfiles.subscribe();
    const sub2 = OfficeRequests.subscribeOffice();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready();
    // Get the Student documents
    const studentProfiles = StudentProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const profileRequests = OfficeRequests.find({ owner: `${studentProfiles[0].email}` }).fetch();
    return {
      student: studentProfiles,
      requests: profileRequests,
      ready: rdy,
    };
  }, []);
  const currentUser = student[0];
  const filteredRequests = requests.filter(own => own.owner === currentUser.email);
  return (ready ? (
    <Container id={PAGE_IDS.STUDENT_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, {currentUser.firstName} {currentUser.lastName}</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded-0">
            <Card.Header className="rounded-0 dashboard-header">
              <Card.Title><h1>My Requests</h1></Card.Title>
            </Card.Header>
            <Card.Body>
              <Row xs={1} md={2} className="g-2 justify-content-center">
                {filteredRequests.map((item) => <StudentMySpaces request={item} key={item._id} />)}
              </Row>
            </Card.Body>
          </Card>
          <Card.Footer className="card-body">
            <Row className="text-center py-1">
              <Col><a href="/faculty" className="btn" style={{ backgroundColor: '#75ABCF', color: 'white' }}>Search Faculty</a></Col>
              <Col><a href="/clubs" className="btn" style={{ backgroundColor: '#75ABCF', color: 'white' }}>Search Clubs</a></Col>
            </Row>
          </Card.Footer>
        </Col>
        <Col md={4}>
          <StudentInfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentHome;
