import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Student } from '../../api/role/Student';
import { StudentInfoItem } from '../components/StudentProfilePageItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const StudentProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, students } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Student.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub1.ready();
    // const rdy = sub2.ready() && sub3.ready();
    // Get the Stuff documents
    const studentInfoItems = StudentProfiles.collection.find({}).fetch();
    return {
      students: studentInfoItems,
      ready: rdy,
    };
  }, []);
  const owner = Meteor.user().username;
  const filteredStudents = students.filter(stu => stu.owner === owner);

  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.STUDENT_PROFILE}>
      <Row className="justify-content-center">
        <Col md={7} className="justify-content-center">
          {filteredStudents.map((student) => <StudentInfoItem key={student.id} student={student} />)}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default StudentProfile;
