import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';
import OfficeItemF from '../components/requestItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListRequest = () => {
// useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, offices } = useTracker(() => {
    // Get access to Office documents
    const subscription = OfficeRequests.subscribeOffice();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Office documents
    const officeRequests = OfficeRequests.find({}).fetch();
    return {
      offices: officeRequests,
      ready: rdy,
    };
  }, []);
  const divStyle = { textAlign: 'center' };
  return (ready ? (
    <Container id={PAGE_IDS.Add_Request} className="py-3">
      <h1 style={divStyle}>Request List</h1>
      <Row xs={1} md={2} lg={4} className="g-2">
        {offices.map((officeReqF) => <OfficeItemF key={officeReqF._id} officeReqF={officeReqF} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Requests" />);
};

export default ListRequest;
