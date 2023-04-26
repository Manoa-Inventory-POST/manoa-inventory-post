import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const FacultyMySpaces = ({ request }) => (
  <Card style={{ width: '20rem' }}>
    <Card.Img variant="top" src={request.picture} />
    <Card.Body>
      <Card.Title style={{ marginTop: '0px' }}>{request.title}</Card.Title>
      <Card.Subtitle>To: {request.requestTo} </Card.Subtitle>
      <Card.Body>
        {request.description}
      </Card.Body>
    </Card.Body>
    <Card.Footer style={{ textAlign: 'center' }}>
      Status: {request.condition}
      <br />
      <hr />
      {request.comment}
    </Card.Footer>
    <Button variant="outline-info">
      <Link className={COMPONENT_IDS.LIST_OFFICE_EDIT} to={`/editCom/${request._id}`}>Add Comment</Link>
    </Button>
  </Card>
);

FacultyMySpaces.propTypes = {
  request: PropTypes.shape({
    owner: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
    requestTo: PropTypes.string,
    description: PropTypes.string,
    condition: PropTypes.string,
    comment: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default FacultyMySpaces;
