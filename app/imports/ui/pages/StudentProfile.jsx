import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { StudentInfoItem } from '../components/StudentProfilePageItem';
// import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
// import { Users } from '../../api/user/UserCollection';
// import { StudentProfiles } from '../../api/user/StudentProfileCollection';
// import { Link } from 'react-router-dom';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentProfile = () => (
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
  <Container className="py-3" id={PAGE_IDS.STUDENT_PROFILE}>
    {/*    <Row className="text-center">
      <Col className="text-center">
        <h1>John Doe</h1>
        <h3>Graduate</h3>
        <h4>TA</h4>
        <Link to="/">Edit</Link>
      </Col>
    </Row> */}

    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right" />
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value="" /></div>
              <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname" /></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value="" /></div>
              <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state" /></div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">Save Profile</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus" />&nbsp;Experience</span></div>
            <br />
            <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value="" /></div>
            <br />
            <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value="" /></div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default StudentProfile;
