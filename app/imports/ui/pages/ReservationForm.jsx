import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
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
const ReservationForm = () => (
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

    <div className="container-md rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-6 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-center">Reserve Now</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">Room<input type="text" className="form-control" placeholder="#" /></div>
              <div className="col-md-6">Duration<input type="text" className="form-control" value="" placeholder="YYMMDD" /></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">Attendance<input type="text" className="form-control" placeholder="10" /></div>
              <div className="col-md-6">Usage<input type="text" className="form-control" value="" placeholder="seminar" /></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">Designated advisor(student only)<input type="text" className="form-control" placeholder="name " /></div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">Submit</button>
            </div>
          </div>
        </div>
        {/* insert component per role */}

      </div>
    </div>
  </Container>
);

export default ReservationForm;
