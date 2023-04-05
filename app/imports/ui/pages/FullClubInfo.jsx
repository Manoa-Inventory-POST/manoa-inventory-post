// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
// import { Roles } from 'meteor/alanning:roles';
// import { Link } from 'react-router-dom';
import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';

const FullFacultyInfo = () => {
  const { _id } = useParams();

  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);

  const { ready, faculty } = useTracker(() => {
    const subscription = FacultyProfiles.subscribeFaculty();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const facultyItem = FacultyProfiles.findOne(_id);
    return {
      ready: rdy,
      faculty: facultyItem,
    };
  }, []);

  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.FULL_FACULTY_INFO}>
      <div className="justify-content-center">
        <Row className="text-center">
          <Col>
            <Row>
              <h1>
                {faculty.firstName} {faculty.lastName}
              </h1>
            </Row>
            <Row>
              <h3>
                {faculty.position}
              </h3>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="text-end">
            <Image rounded style={{ alignSelf: 'start' }} width={300} src={faculty.picture} />
          </Col>
          <Col>
            <Row>
              <h5>Email: {faculty.email}</h5>
            </Row>
            <Row>
              <h5>Phone Number: {faculty.phone}</h5>
            </Row>
            <Row>
              <Col>
                <Row lg={2}><h5>Office Hours:</h5></Row>
                <Row lg={2}>&ensp;<h5>{faculty.officeHours}</h5></Row>
              </Col>
            </Row>
            {isAdmin || isOffice ? ([
              <Row>
                <Col>
                  <h5>Emergency Contact: {faculty.emergency}</h5>
                </Col>
              </Row>,
            ]) : ''}
          </Col>
        </Row>
      </div>
    </Container>
  ) : <LoadingSpinner />);
};

export default FullFacultyInfo;
