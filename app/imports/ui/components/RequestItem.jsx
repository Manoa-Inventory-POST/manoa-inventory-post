import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

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
        <Card.Subtitle style={{ paddingBottom: '10px' }}>
          Time: {officeReqF.time}
        </Card.Subtitle>
        <Card.Body>
          {officeReqF.description}
        </Card.Body>
      </Card.Body>
      <Card.Footer style={{ textAlign: 'center' }}>
        Status: {officeReqF.condition}
        <br />
        <hr />
        {officeReqF.comment}
      </Card.Footer>
      <Button variant="outline-info">
        <Link className={COMPONENT_IDS.LIST_OFFICE_EDIT} to={`/editCom/${officeReqF._id}`}>Add Comment</Link>
      </Button>
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
