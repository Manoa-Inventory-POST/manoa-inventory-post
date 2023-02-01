import React from 'react';
import { Card, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

const StudentHome = () => (
  <div>
    <div className="landing-page-background">
      <h1> MĀNOA INVENTORY: POST (STUDENT)</h1>
      <div id="about-summary">
        <h4>Student Home page</h4>
        <h4>You are Logged In</h4>
      </div>
    </div>
    <Container id="landing-page">
      {/* eslint-disable-next-line max-len */}
      <h6 id="about-landing">Mānoa Inventory: POST is a web application tool to allow many users and roles to find what they are looking for on the third floor of POST building at UH Manoa. With the various spaces and inventory it has to
        offer, we strive to make the reservation and management process an easy one. Features include but are not limited to:
      </h6>
      <Row className="align-middle text-center">
        <Col className="d-flex flex-column justify-content-center">
          <Row xs={1} md={2}>
            <div className="summary-card">
              <Card>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title>For Students</Card.Title>
                    </ListGroupItem>
                    <Card.Text className="role- list">
                      <ul>
                        <li>Request room reservations based upon availability and approval</li>
                        <li>View the offices your professors are located in</li>
                        <li>Request a cubicle (TA/RA)</li>
                      </ul>
                    </Card.Text>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
            <div className="summary-card">
              <Card>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title>For Office Staff</Card.Title>
                    </ListGroupItem>
                    <Card.Text className="role- list">
                      <ul>
                        <li>Find out which rooms has what tools and materials</li>
                        <li>Assign and move occupants to a different room</li>
                        <li>Responsible for space management</li>
                      </ul>
                    </Card.Text>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
            <div className="summary-card">
              <Card>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title>For IT Support</Card.Title>
                    </ListGroupItem>
                    <Card.Text className="role- list">
                      <ul>
                        <li>View which rooms has functional ports</li>
                        <li>Update the functionality status of equipment and materials</li>
                        <li>Check up on network jacks and phone jacks</li>
                      </ul>
                    </Card.Text>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
            <div className="summary-card">
              <Card>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title>For Faculty</Card.Title>
                    </ListGroupItem>
                    <Card.Text>
                      <ul>
                        <li>View what rooms are available by date and time</li>
                        <li>View which rooms have which equipment</li>
                        <li>Reserve rooms</li>
                      </ul>
                    </Card.Text>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
);

export default StudentHome;
