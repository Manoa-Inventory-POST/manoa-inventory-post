import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const FacultyMySpaces = () => (
  /** something to do with room collections here */

  <Card className="rounded-0">
    <Card.Header className="rounded-0 dashboard-header">
      <Card.Title><h2>Upcoming Activity in My Spaces</h2></Card.Title>
    </Card.Header>
    <Card>
      <Card.Body>
        <Card.Img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081" className="shadow-4 float-start m-4" style={{ width: '150px' }} />
        <Card.Title>Port Troubleshooting</Card.Title>
        <Card.Text>
          Date/Time Scheduled: 1/1/23 at 10:00 AM<br />
          Port Number: 123-40<br />
          Room: POST 311<br />
          Phone Number: 808-123-4567<br />
          Equipment in Room:<br />
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081" className="shadow-4 float-start m-4" style={{ width: '150px' }} />
        <Card.Title>Replace TV</Card.Title>
        <Card.Text>
          Date/Time Scheduled: 1/2/23 at 10:00 AM<br />
          Port Number: 123-40<br />
          Room: POST 318<br />
          Phone Number: 808-123-4567<br />
          Equipment in Room:<br />
        </Card.Text>
      </Card.Body>
    </Card>
    <Card.Footer className="card-body">
      <Row className="text-center">
        <Col><a href="/ports" className="btn" style={{ backgroundColor: '#75ABCF', color: 'white' }}>Search Ports</a></Col>
        <Col><a href="/search-rooms" className="btn" style={{backgroundColor: '#75ABCF', color: 'white' }}>Search Rooms</a></Col>
      </Row>
    </Card.Footer>
  </Card>
);
export default FacultyMySpaces;
