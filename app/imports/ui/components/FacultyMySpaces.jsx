import React from 'react';
import { Card } from 'react-bootstrap';

const FacultyMySpaces = () => (
  /** something to do with room collections here */

  <Card className="rounded-0">
    <Card.Header className="rounded-0 dashboard-header">
      <Card.Title><h1>My Spaces</h1></Card.Title>
    </Card.Header>
    <Card>
      <Card.Body>
        <Card.Img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081" className="shadow-4 float-start m-4" style={{ width: '150px' }} />
        <Card.Title>POST 311</Card.Title>
        <Card.Text>
          Type: Office<br />
          Phone Number: 808-123-4567<br />
          Equipment:<br />
          Capacity:<br />
          My Occupancy Hours:<br />
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081" className="shadow-4 float-start m-4" style={{ width: '150px' }} />
        <Card.Title>HOLMES 215</Card.Title>
        <Card.Text>
          Type: Classroom<br />
          Phone Number: 808-234-5678<br />
          Equipment:<br />
          Capacity: 50 pax<br />
          My Occupancy Hours: MW 9:30AM-10:30AM<br />
        </Card.Text>
      </Card.Body>
    </Card>
    <Card.Footer>
      <a href="/home" className="btn btn-primary">Go somewhere</a>
    </Card.Footer>
  </Card>
);
export default FacultyMySpaces;
