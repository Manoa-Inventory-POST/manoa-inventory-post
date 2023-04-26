import React, { useState } from 'react';
import { Container, Row, Form, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { OfficeRequests } from '../../api/user/OfficeRequestCollection';
import OfficeItem from '../components/officeItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const ListRequest = () => {
  const [conditionFilter, setConditionFilter] = useState('');
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, offices } = useTracker(() => {
    // Get access to Office documents
    const subscription = OfficeRequests.subscribeOffice();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Office documents
    let officeRequests = OfficeRequests.find({}).fetch();
    if (conditionFilter) {
      officeRequests = officeRequests.filter((officeReq) => officeReq.condition.toLowerCase().includes(conditionFilter.toLowerCase()));
    }
    return {
      offices: officeRequests,
      ready: rdy,
    };
  }, [conditionFilter]);
  const divStyle = { textAlign: 'center' };
  const handleSelect = (e) => {
    e.preventDefault();
    setConditionFilter(e.target.value);
  };

  return (ready ? (
    <Container id={PAGE_IDS.Add_Request} className="py-3">
      <h1 style={divStyle}>Request List</h1>
      <hr />
      <Form.Group as={Row} controlId="formCondition">
        <Form.Label column sm={2}>Filter by Status:</Form.Label>
        <Col sm={10}>
          <Form.Control
            as="select"
            defaultValue=""
            onChange={handleSelect}
          >
            <option value="">Pick an option</option>
            <option value="pending">Pending</option>
            <option value="approve">Approved</option>
            <option value="denied">Denied</option>
          </Form.Control>
        </Col>
      </Form.Group>
      <br />
      <Row xs={1} md={2} lg={4} className="g-2">
        {offices.map((officeReq) => <OfficeItem key={officeReq._id} officeReq={officeReq} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Requests" />);
};

export default ListRequest;
