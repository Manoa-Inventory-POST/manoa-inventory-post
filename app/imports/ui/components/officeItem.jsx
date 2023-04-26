import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/* Component for layout out a Project Card. */
const OfficeItem = ({ officeReq }) => (
  <Col>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={officeReq.picture} />
      <Card.Body>
        <Card.Title style={{ marginTop: '0px' }}>{officeReq.title}</Card.Title>
        <Card.Subtitle style={{ paddingBottom: '10px' }}>
          Form: {officeReq.firstName} {officeReq.lastName}
        </Card.Subtitle>
        <Card.Subtitle>To: {officeReq.requestTo} </Card.Subtitle>
        <Card.Body>
          {officeReq.description}
        </Card.Body>
      </Card.Body>
      <Card.Footer style={{ textAlign: 'center' }}>
        Status: {officeReq.condition}
        <br />
        <hr />
        {officeReq.comment}
      </Card.Footer>
      <Button variant="outline-info">
        <Link className={COMPONENT_IDS.LIST_OFFICE_EDIT} to={`/editReq/${officeReq._id}`}>edit</Link>
      </Button>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
OfficeItem.propTypes = {
  officeReq: PropTypes.shape({
    title: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string,
    condition: PropTypes.string,
    requestTo: PropTypes.string,
    picture: PropTypes.string,
    comment: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default OfficeItem;
