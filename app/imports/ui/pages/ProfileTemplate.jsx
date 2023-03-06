import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { StudentInfoItem } from '../components/StudentProfilePageItem';
// import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* import depending on role
 import StudentInfoItem from '../components/StudentProfilePageItem';
 import { FacultyInfoItem } from '../components/FacultyProfilePageItem';
 */

// import { Users } from '../../api/user/UserCollection';
// import { StudentProfiles } from '../../api/user/StudentProfileCollection';
// import { Link } from 'react-router-dom';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ProfileTemplate = () => (
  /**
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub1.ready();
    // const rdy = sub2.ready() && sub3.ready();
    // Get the Stuff documents
    // const studentInfoItems = StudentProfiles.collection.find({}).fetch();
    return {
      // students: studentInfoItems,
      ready: rdy,
    };
  }, []);
   const owner = Meteor.user().username;
   const filteredStudents = students.filter(stu => stu.owner === owner);
*/
  <Container className="py-3" id={PAGE_IDS.PROFILE}>
    {/*    <Row className="text-center">
      <Col className="text-center">
        <h1>John Doe</h1>
        <h3>Graduate</h3>
        <h4>TA</h4>
        <Link to="/">Edit</Link>
      </Col>
    </Row> */}

    <Container className="rounded bg-white mt-5 mb-5">
      <Row>
        <Col className="md-6 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <Row className="mt-2">
              <Col className="md-6">First Name<input type="text" className="form-control" placeholder="First Name" /></Col>
              <Col className="md-6">Last Name<input type="text" className="form-control" placeholder="Last Name" /></Col>
            </Row>
            <Row className="mt-2">
              <Col className="md-12">Email Address<input type="text" className="form-control disabled" value="[Insert Email]" disabled /></Col>
            </Row>
            <Row className="mt-3">
              <Col className="md-6">Phone Number<input type="text" className="form-control" placeholder="(xxx)xxx-xxxx" /></Col>
              <Col className="md-6">Building/Room<input type="text" className="form-control" placeholder="Building-Room#" disabled /></Col>
            </Row>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">Save Profile</button>
            </div>
          </div>
        </Col>
        {/* insert component per role */}

      </Row>
    </Container>
  </Container>
);

export default ProfileTemplate;
