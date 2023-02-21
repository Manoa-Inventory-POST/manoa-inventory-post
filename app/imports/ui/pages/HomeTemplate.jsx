import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/StuffCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
// import InfoBar from '../components/InfoBar';
// import SearchBox from '../components/SearchBox';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const HomeTemplate = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Stuffs.subscribeStuffAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Stuffs.find({}).fetch();
    return {
      stuffs: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.LIST_STUFF_ADMIN} className="py-3">
      <Row>
        <Col className="ms-5 my-3"><h2>Welcome, Lydia Sollis</h2></Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default HomeTemplate;
