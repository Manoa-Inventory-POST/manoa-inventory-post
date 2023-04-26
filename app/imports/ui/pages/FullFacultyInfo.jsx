// import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
// import { Roles } from 'meteor/alanning:roles';
// import { Link } from 'react-router-dom';
import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import { ROLE } from '../../api/role/Role';
import { Phone } from '../../api/room/Phone';
import { OccupantRoom } from '../../api/room/OccupantRoom';

const FullFacultyInfo = () => {
  const { _id } = useParams();

  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  const isOffice = Roles.userIsInRole(Meteor.userId(), [ROLE.OFFICE]);

  const { ready, faculty, office, phone } = useTracker(() => {
    const sub1 = FacultyProfiles.subscribeFaculty();
    const sub2 = OccupantRoom.subscribeOccupantRoom();
    const sub3 = Phone.subscribePhone();
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready() && sub3.ready();
    // Get the document
    const facultyItem = FacultyProfiles.findOne(_id);
    let officeItem = OccupantRoom.find({ email: `${facultyItem.email}` }).fetch();
    if (officeItem.length === 1) {
      officeItem = officeItem[0];
    } else {
      officeItem = officeItem.join(', ');
    }
    let phoneItem = Phone.find({ email: `${facultyItem.email}`}).fetch();
    if (phoneItem.length === 1) {
      phoneItem = phoneItem[0];
    } else {
      phoneItem = phoneItem.join(', ');
    }
    return {
      ready: rdy,
      faculty: facultyItem,
      office: officeItem,
      phone: phoneItem,
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
              <h5>{ phone.length === 0 ? ('') : `Phone: ${phone.phoneNum}` }</h5>
              <h5>Office: { office.length === 0 ? (<Link to="/signin" style={{ fontSize: '1.10rem' }}>Please sign in for more information.</Link>) : `POST ${office.room}` }</h5>
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
                  <h5>Emergency Phone Number: {faculty.emergencyPhone}</h5>
                </Col>
              </Row>,
              <Row>
                <Col>
                  <h5>Emergency Email: {faculty.emergencyEmail}</h5>
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
