import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

/* Component for layout out a Project Card. */
const OfficeItemF = ({ officeReqF }) => (
  <Col>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://www.smartsheet.com/sites/default/files/ic-og-ApprovalProcessWorkflow-FacebookLinkedIn.jpg" />
      <Card.Body>
        <Card.Title style={{ marginTop: '0px' }}>{officeReqF.title}</Card.Title>
        <Card.Subtitle>{officeReqF.firstName} {officeReqF.lastName}</Card.Subtitle>
        <Card.Body>
          {officeReqF.description}
        </Card.Body>
      </Card.Body>
      <Card.Footer style={{ textAlign: 'center' }}>
        {officeReqF.condition}
      </Card.Footer>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
OfficeItemF.propTypes = {
  officeReqF: PropTypes.shape({
    title: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    condition: PropTypes.string,
    requestTo: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OfficeItemF;
