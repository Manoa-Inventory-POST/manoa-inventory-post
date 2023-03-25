import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';
import OfficeItem from '../components/officeItem';
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

  return (ready ? (
    <Container id={PAGE_IDS.Add_Request} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Request List</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>email</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>description</th>
                <th>condition</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((officeReq) => <OfficeItem key={officeReq._id} officeReq={officeReq} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Requests" />);
};

export default ListRequest;
