import React from 'react';
import { Col, Container, Row, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Landing = () => (
  <div>
    <div className="landing-page-background">
      <h1> MĀNOA INVENTORY: POST</h1>
      <div id="about-summary">
        <h4>Manage and View Office Space/Inventory with ease</h4>
      </div>
      <div id="sign-up-button">
        <h3>New User?</h3>
        <Button as={NavLink} exact to="/signup" variant="primary" size="large">Sign up</Button>
      </div>
      <div id="log-in-button">
        <h3>Already have an account?</h3>
        <Button as={NavLink} to="/signin" variant="success" size="large">Log in</Button>
      </div>
    </div>
    <Container id="landing-page">
      <h6 id="about-landing">
        Mānoa Inventory: POST is a web application tool to allow many users and roles to find what they are looking for on the third floor of
        POST building at UH Manoa. With the various spaces and inventory it has to offer, we strive to make the reservation and management process an easy one. Features include but are not limited to:
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

export default Landing;
