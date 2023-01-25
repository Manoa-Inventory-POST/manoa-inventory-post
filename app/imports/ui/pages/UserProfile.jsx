import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/user/UserCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { UserInfoItem } from '../components/UserProfilePageItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const UserProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, user } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Users.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub1.ready();
    // const rdy = sub2.ready() && sub3.ready();
    // Get the Stuff documents
    const userInfoItems = UserProfiles.collection.find({}).fetch();
    return {
      user: userInfoItems,
      ready: rdy,
    };
  }, []);
  const owner = Meteor.user().username;
  const filteredUsers = user.filter(stu => stu.owner === owner);

  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.STUDENT_PROFILE}>
      <Row className="justify-content-center">
        <Col md={7} className="justify-content-center">
          {filteredUsers.map((student) => <UserInfoItem key={student.id} student={student} />)}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default UserProfile;
