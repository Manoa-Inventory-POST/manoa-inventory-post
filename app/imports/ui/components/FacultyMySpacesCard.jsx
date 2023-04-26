import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FacultyMySpacesCard = ({ office }) => (
  <Card className="rounded-0">
    <Card>
      <Card.Body>
        <Card.Img
          src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081"
          className="shadow-4 float-start m-4"
          style={{ width: '150px' }}
        />
        <Card.Title>POST { office.room }</Card.Title>
        <Card.Text>
          Phone Number: { office.phone }<br />
          Occupancy Hours: { office.hours }<br />
          Ports: { office.ports }
        </Card.Text>
      </Card.Body>
    </Card>
  </Card>
);
FacultyMySpacesCard.propTypes = {
  office: PropTypes.shape({
    phone: PropTypes.string,
    room: PropTypes.string,
    hours: PropTypes.string,
    ports: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default FacultyMySpacesCard;
