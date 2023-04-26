import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import FacultyInfoBar from '../components/FacultyInfoBar';
import FacultyMySpaces from '../components/FacultyMySpaces';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';

/* Renders a table containing all of the Faculty documents. Use <FacultyInfoBar> to render each row. */
const FacultyHome = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, faculty, requests } = useTracker(() => {
    // Get access to Faculty documents
    const sub1 = FacultyProfiles.subscribeFaculty();
    const sub2 = OfficeRequests.subscribeOffice();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready();
    // Get the Faculty documents
    const facultyProfiles = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    console.log(facultyProfiles[0].email);
    const profileRequests = OfficeRequests.find({ owner: `${facultyProfiles[0].email}` }).fetch();
    return {
      faculty: facultyProfiles,
      requests: profileRequests,
      ready: rdy,
    };
  }, []);
  const currentUser = faculty[0];
  const filteredRequests = requests.filter(own => own.owner === currentUser.email);
  return (ready ? (
    <Container id={PAGE_IDS.FACULTY_HOME} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, { currentUser.firstName } { currentUser.lastName }</h2></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="rounded-0">
            <Card.Header className="rounded-0 dashboard-header">
              <Card.Title><h1>My Requests</h1></Card.Title>
            </Card.Header>
            <Card.Body>
              <Row xs={1} md={2} className="g-2 justify-content-center">
                {filteredRequests.map((item) => <FacultyMySpaces request={item} key={item._id} />)}
              </Row>
            </Card.Body>
            <Card.Footer>
              <a href="/service" className="btn" style={{ backgroundColor: '#75ABCF', color: 'white' }}>Service Request</a>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <FacultyInfoBar />
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default FacultyHome;
