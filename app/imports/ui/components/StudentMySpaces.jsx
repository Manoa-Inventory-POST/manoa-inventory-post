import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const StudentMySpaces = () => (
  /** something to do with room collections here */

  <Card className="rounded-0">
    <Card.Header className="rounded-0 dashboard-header">
      <Card.Title><h1>My Courses</h1></Card.Title>
    </Card.Header>
    <Card>
      <Card.Body>
        <Card.Img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081" className="shadow-4 float-start m-4" style={{ width: '150px' }} />
        <Card.Title>ICS 211</Card.Title>
        <Card.Text>
          Date/Time Scheduled: MWF at 10:00 AM<br />
          Building/Room: POST 319<br />
          Professor Name: John Smith<br />
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081" className="shadow-4 float-start m-4" style={{ width: '150px' }} />
        <Card.Title>ICS 215</Card.Title>
        <Card.Text>
          Date/Time Scheduled: MWF at 2:00 PM<br />
          Building/Room: POST 319<br />
          Professor Name: John Doe<br />
        </Card.Text>
      </Card.Body>
    </Card>
    <Card.Footer className="card-body">
      <Row className="text-center">
        <Col><a href="/faculty" className="btn" style={{ backgroundColor: '#75ABCF', color: 'white' }}>Search Faculty</a></Col>
        <Col><a href="/clubs" className="btn" style={{ backgroundColor: '#75ABCF', color: 'white' }}>Search Clubs</a></Col>
      </Row>
    </Card.Footer>
  </Card>
);

export default StudentMySpaces;
