import React from 'react';
import { Col, Container, Row, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Calendar, CalendarFill, Map, MapFill, Person, PersonFill, PhoneFill, Telephone } from "react-bootstrap-icons";

/* A simple static component to render some text for the landing page. */
/*const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome to this template</h1>
        <p>Now get to work and modify this app!</p>
      </Col>

    </Row>
  </Container>
);*/

const Landing = () => (
  <div>
    <div className="landing-page-background">
    <h1> MĀNOA INVENTORY: POST</h1>
    <div id="about-summary">
    <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h4>
     <h4> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4>
    </div>
    <div id="sign-up-button">
      <h3>New User?</h3>
      <Button  as={ NavLink } exact to="/signup" variant="primary" size="large">Sign up</Button>
    </div>
    <div id="log-in-button">
      <h3>Already have an account?</h3>
      <Button as={NavLink} to="/signin" variant="success" size="large">Log in</Button>
    </div>
    </div>
    <Container id='landing-page'>
      <Row className="align-middle text-center">
        <Col className="d-flex flex-column justify-content-center">
          <Row xs={1} md={2}>
            <div className="summary-card">
              <Card>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <Card.Title><Person/>Lorem ipsum</Card.Title>
                    </ListGroupItem>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
                      <Card.Title><Map/>Lorem ipsum</Card.Title>
                    </ListGroupItem>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
                      <Card.Title><Telephone/>Lorem ipsum</Card.Title>
                    </ListGroupItem>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
                      <Card.Title><Calendar/>Lorem ipsum</Card.Title>
                    </ListGroupItem>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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


)

export default Landing;
