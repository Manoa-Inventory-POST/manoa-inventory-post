import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

/* Component for layout out a Project Card. */
const OfficeItemF = ({ officeReqF }) => (
  <Col>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={officeReqF.picture} />
      <Card.Body>
        <Card.Title style={{ marginTop: '0px' }}>{officeReqF.title}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: '10px' }}>
          Form: {officeReqF.firstName} {officeReqF.lastName}
        </Card.Subtitle>
        <Card.Subtitle>To: {officeReqF.requestTo} </Card.Subtitle>
        <Card.Body>
          {officeReqF.description}
        </Card.Body>
        <p style={{ paddingLeft: '200px' }}>{officeReqF.timeByPoster}</p>
      </Card.Body>
      <Card.Footer style={{ textAlign: 'center' }}>
        Status: {officeReqF.condition}
        <br />
        <hr />
        {officeReqF.comment}
      </Card.Footer>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
OfficeItemF.propTypes = {
  officeReqF: PropTypes.shape({
    picture: PropTypes.string,
    title: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    condition: PropTypes.string,
    requestTo: PropTypes.string,
    comment: PropTypes.string,
    timeByPoster: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OfficeItemF;
